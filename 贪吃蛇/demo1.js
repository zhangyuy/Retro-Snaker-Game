
var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var scoreBox = document.getElementById('score');
var lose = document.getElementById('lose');
var loserScore = document.getElementById('loserScore');
var close = document.getElementById('close');
var startP = document.getElementById('startPageAndP');
var startBtn = document.getElementById('startBtn');
var startGameBool = true;
var startPaushBool = true;
var snakeMove = null;
var speed = 500;
init();//初始化函数
    function init() {
    //地图的宽 高
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;
    //食物的属性
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    //蛇
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [[4,1,'head'],[3,1,'body'],[2,1,'body']];
    //方向
    this.direct = "right";
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    //分数
    this.score = 0;
     bindEvent();
}
    function startGame() {
    startPage.style.display = 'none';
    startP.style.display = 'block';
    food();
    snake();

}
    function food() {
        var food = document.createElement('div'); //创建食物的div
        food.style.width = this.foodW + 'px';    //设置食物的宽度为 20px
        food.style.height = this.foodH + 'px';  //设置食物的高度为 20 px
        food.style.position = 'absolute';       //设置食物为绝对定位
        this.foodX = Math.floor(Math.random() *(this.mapW/ 20));//计算食物的横坐标
        this.foodY = Math.floor(Math.random() *(this.mapH/ 20));//计算食物的纵坐标
        food.style.left = this.foodX * 20 + 'px';//计算食物的水平距离
        food.style.top = this.foodY *20+ 'px';   //计算食物的垂直距离
        this.mapDiv.appendChild(food).setAttribute('class','food');//将食物div插入到地图中，并设置div的类名
    }
    function snake() {
        for(var i = 0; i < this.snakeBody.length; i++){ //根据蛇的数组长度进行渲染
            var snake = document.createElement('div'); //根据蛇的数组长度创建div
            snake.style.width = this.snakeW + 'px';
            snake.style.height = this.snakeH + 'px';
            snake.style.position ='absolute';
            snake.style.left = this.snakeBody[i][0] * 20 + 'px';//蛇的水平距离
            snake.style.top= this.snakeBody[i][1] * 20 + 'px';//蛇的垂直距离
            snake.classList.add(this.snakeBody[i][2]);          //为蛇的每一节添加不同的类名
            this.mapDiv.appendChild(snake).classList.add('snake');//将蛇插入到地图中
            switch (this.direct){// 修正蛇头的方向
                case "right":
                    break;
                case "up":
                    snake.style.transform = 'rotate(270deg)';
                    break;
                case "left":
                    snake.style.transform = 'rotate(180deg)';
                    break;
                case "down":
                    snake.style.transform = 'rotate(90deg)';
                    break;
                default:
                    break;
            }
        }

    }
    function move() {
        for(var i = this.snakeBody.length-1;i>0; i--){
            this.snakeBody[i][0] = this.snakeBody[i - 1][0];
            this.snakeBody[i][1] = this.snakeBody[ i - 1][1];
        }
        switch (this.direct){ //根据方向，改变蛇头的坐标
            case "right":
                this.snakeBody[0][0] += 1;
                break;
            case "up":
                this.snakeBody[0][1] -= 1;
                break;
            case "left":
                this.snakeBody[0][0] -= 1;
                break;
            case "down":
                this.snakeBody[0][1] += 1;
                break;
            default:
                break;
        }
        removeClass('snake');
        snake();
        //判断蛇是否吃到食物，吃到-分数加一，并写入到分数的位置上,蛇身增加
        if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY){
            this.score += 1;
            scoreBox.innerHTML = this.score;
            removeClass('food');
            food();
            var snakeEndX = this.snakeBody[this.snakeBody.length -1][0];
            var snakeEndY = this.snakeBody[this.snakeBody.length -1][1];
            switch (this.direct){ //根据方向，增加蛇身
                case "right":
                    this.snakeBody.push([snakeEndX+1,snakeEndY,'body'])
                    break;
                case "up":
                    this.snakeBody.push([snakeEndX,snakeEndY -1,'body'])
                    break;
                case "left":
                    this.snakeBody.push([snakeEndX-1,snakeEndY,'body'])
                    break;
                case "down":
                    this.snakeBody.push([snakeEndX,snakeEndY + 1,'body'])
                    break;
                default:
                    break;
            }
        }
        if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW /20){
            reloadGame();
        }
        if(this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH /20){
            reloadGame();
        }
        var snakeHX = this.snakeBody[0][0];
        var snakeHY = this.snakeBody[0][1];
        for(var i = 1; i < this.snakeBody.length; i++){
            if(snakeHX == this.snakeBody[i][0] && snakeHY ==this.snakeBody[i][1]){
                reloadGame();
            }
        }

    }
    function reloadGame() {
        removeClass('snake');
        removeClass('food');
        clearInterval(snakeMove);
        this.snakeBody = [[4,1,'head'],[3,1,'body'],[2,1,'body']];
        //方向
        this.direct = "right";
        this.left = false;
        this.right = false;
        this.up = true;
        this.down = true;
        //分数
        lose.style.display = 'block';
        loserScore.innerHTML = this.score ;
        this.score = 0;
        scoreBox.innerText = this.score;

         startGameBool = true;
         startPaushBool = true;
        startP.setAttribute('src','./img/start.png')
    }
    function removeClass(className) {
        var ele = document.getElementsByClassName(className);
        while(ele.length > 0 ){
            ele[0].parentNode.removeChild(ele[0]);
        }

    }
    function setDirect(code) {
        switch(code){
            case 37:
                if(this.left){
                    this.direct = 'left';
                    this.right = false;
                    this.left = false;
                    this.up = true;
                    this.down = true;
                }
                break;
            case 38:
                if(this.up){
                    this.direct = 'up';
                    this.right = true;
                    this.left = true;
                    this.up =  false;
                    this.down =  false;
                }
                break;
            case 39:
                if(this.right){
                    this.direct = 'right';
                    this.right = false;
                    this.left = false;
                    this.up = true;
                    this.down = true;
                }
                break;
            case 40:
                if(this.down){
                    this.direct = 'down';
                    this.right = true;
                    this.left = true;
                    this.up = false;
                    this.down = false;
                }
                break;
            default:
                break;

        }


    }
    function bindEvent() {
        close.onclick = function (e) {
           lose.style.display = 'none';
        }
        startBtn.onclick = function () {
            startAndPaush();
        }
        startP.onclick = function () {
            startAndPaush();
        }

    }
    function startAndPaush() {
        if(startPaushBool){
            if(startGameBool){
                startGame();
                startGameBool = false;
            }
            startP.setAttribute('src','./img/pause.png');//改变按钮图片
            document.onkeydown = function (e) {//监听键盘事件
                var code = e.keyCode;
                setDirect(code);
            };
            snakeMove = setInterval(function () {//蛇运动
                move();
            },speed);
            startPaushBool = false;
        }else{
            startP.setAttribute('src','./img/start.png');
            clearInterval(snakeMove);
            document.onkeydown = function (e) {
                e.returnValue = false;
                return false;
            }
            startPaushBool = true;
        }

    }