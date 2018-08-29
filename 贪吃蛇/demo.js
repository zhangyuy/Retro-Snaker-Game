//点击开始游戏-->startPage消失--》游戏开始
//随机出现食物，出现三节蛇开始运动
//上下左右--》改变运动方向
//判断是否吃到食物--》食物消失，蛇加一
//判断游戏结束，弹出框

    var content = document.getElementById('content');
    var startPage = document.getElementById('startPage');
    var scoreBox = document.getElementById('score');
    var lose = document.getElementById('lose');
    var loserSckore = document.getElementById('loserScore');
    var snakeMove ;
    var speed = 200;
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
        //游戏属性
        this.direct = 'right';
        this.left = false;//方向锁
        this.right = false;
        this.up = true;
        this.down= true;
        this.score = 0;
        startGame();
    }
    function startGame() {
        food();
        snake();
        snakeMove = setInterval(function () {
            move();
        },speed)
        bindEvent();
    }
    function food() {
        var food = document.createElement('div');
        food.style.width = this.foodW + 'px';
        food.style.height = this.foodH + 'px';
        food.style.position = 'absolute';
        this.foodX = Math.floor(Math.random()*(this.mapW/20));
        this.foodY = Math.floor(Math.random()*(this.mapH/20));
        food.style.left = this.foodX * 20 + 'px';
        food.style.top = this.foodY * 20 + 'px';
        this.mapDiv.appendChild(food).setAttribute('class','food');
    }
    function snake() {
        var len = this.snakeBody.length;
        for(var i = 0;i < len ; i++){
            var snake = document.createElement('div');
            snake.style.width = this.snakeW +'px';
            snake.style.height =this.snakeH + 'px';
            snake.style.position = "absolute";
            snake.style.left =  this.snakeBody[i][0] * 20 + 'px';
            snake.style.top=  this.snakeBody[i][1] * 20 + 'px';
            snake.classList.add(this.snakeBody[i][2]);
            this.mapDiv.appendChild(snake).classList.add('snake');
            switch (this.direct){
                case 'right':
                    break;
                case 'up':
                    snake.style.transform = 'rotate(270deg)';
                    break;
                case 'left':
                    snake.style.transform = 'rotate(180deg)';
                    break;
                case 'down':
                    snake.style.transform = 'rotate(90deg)';
                    break;
            }
        }
    }
    function move() {
        for(var i = this.snakeBody.length -1;i > 0;i--){
            this.snakeBody[i][0] = this.snakeBody[i-1][0];
            this.snakeBody[i][1] = this.snakeBody[i-1][1];
        }
        switch (this.direct){
            case 'right':
                this.snakeBody[0][0] += 1;
                break;
            case 'up':
                this.snakeBody[0][1] -= 1;
                break;
            case 'left':
                this.snakeBody[0][0] -= 1;
                break;
            case 'down':
                this.snakeBody[0][1] += 1;
                break;
        }
        removeClass('snake');
        snake();
        // 是否吃到食物
        if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY){
            var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
            var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
            switch (this.direct){
                case 'right':
                    this.snakeBody.push([snakeEndX+1,snakeEndY,'body'])
                    break;
                case 'up':
                    this.snakeBody.push([snakeEndX,snakeEndY-1,'body'])
                    break;
                case 'left':
                    this.snakeBody.push([snakeEndX-1,snakeEndY,'body'])
                    break;
                case 'down':
                    this.snakeBody.push([snakeEndX,snakeEndY+1,'body'])
                    break;
                default:
                    break;
            }
            this.score += 1;
            scoreBox.innerHTML = this.score;
            removeClass('food');
            food();
        }
         }
         // 是否碰到边界

        if(this.snakeBody[0][0] < 0 ||this.snakeBody[0][0] >= this.mapW/20){
                reloadGame();
        }
        if(this.snakeBody[0][1] < 0 ||this.snakeBody[0][1] >= this.mapH/20){
                reloadGame();
        }
        var snakeHX = this.snakeBody[0][0];
        var snakeHY = this.snakeBody[0][1];
        for(var i =0 ;i < this.snakeBody.length;i++){
            if(snakeHX == snakeBody[i][0] &&snakeHY ==snakeBody[i][1] ){
                reloadGame();
            }
        }
        function reloadGame() {
            removeClass('snake');
            removeClass('food');
            clearInterval(snakeMove);
            this.snakeBody = [[4,1,'head'],[3,1,'body'],[2,1,'body']];
            this.direct = 'right';
            this.left = false;//方向锁
            this.right = false;
            this.up = true;
            this.down= true;
            lose.style.display = 'block';
            loserSckore.innerHTML = this.score;
            this.score = 0;
            scoreBox.innerHTML = this.score;
        }


    function removeClass(className) {
        var ele = document.getElementsByClassName(className);
        while(ele.length > 0){
            ele[0].parentNode.removeChild(ele[0]);//删掉之前的蛇
        }
    }
    function setDirect(code) {
        switch(code){
            case 37:
                if(this.left){
                    this.direct = 'left';
                    this.left = false;
                    this.right = false;
                    this.up = true;
                    this.down = true;
                }
                break;
            case 38:
            if(this.up){
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
            case 39:
                if(this.right){
                    this.direct = 'right';
                    this.left = false;
                    this.right = false;
                    this.up = true;
                    this.down = true;
                }
                break;
            case 40:
                if(this.down){
                    this.direct = 'down';
                    this.left = true;
                    this.right = true;
                    this.up = false;
                    this.down = false;
                }
                break;
            default:
                break;

        }
    }
    function bindEvent() {//绑定键盘事件，获得键盘事件的ASCII
        document.onkeydown = function (e) {
            var code = e.keyCode;
            setDirect(code);
        }
    }