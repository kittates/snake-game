import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";

//用来控制其它类
class GameControl {
    food: Food;
    snake: Snake;
    scorepanel: ScorePanel;
    direction: string;
    isLive: boolean;    //gameover?

    constructor() {
        this.food = new Food();
        this.snake = new Snake()
        this.scorepanel = new ScorePanel();
        this.direction = 'ArrowDown';
        this.isLive = true; 
        this.init();
    }

    init() {
        document.addEventListener("keydown",this.keydownHandler.bind(this));
        this.run();
    }
    //里面的this指向的是document
    keydownHandler(e:KeyboardEvent) {
        let tmp: string = '';
        //判断用户输入是否合法
        if(e.key == 'ArrowUp' || e.key == 'ArrowDown' || e.key == 'ArrowLeft' || e.key =='ArrowRight') {
            switch(e.key) {
                case 'ArrowUp':
                    tmp = 'w';
                    break;
                case 'ArrowDown': 
                    tmp = 's';  
                    break;
                case 'ArrowLeft': 
                    tmp = 'a';  
                    break;
                case 'ArrowRight': 
                    tmp = 'd';  
                    break;
            }
            //禁止掉头
            if((this.direction=='w' && tmp=='s') || (this.direction=='s' && tmp=='w') || (this.direction=='a' && tmp=='d') || (this.direction=='d' && tmp=='a'))
            return;
            this.direction = tmp;
        }  
    }

    run() {
        let X: number = this.snake.X;
        let Y: number = this.snake.Y;

        //检查在当前位置上是否吃到了食物
        if(this.checkEat(X,Y)) {
            this.snake.addBody();
            this.food.change();
            //TODO:生成的food坐标不能和蛇身重叠
            
            this.scorepanel.addScore();
        }
        switch(this.direction) {
            case 'w':
                Y -= 10;
                break;
            case 's':
                Y += 10;
                break;
            case 'a': 
                X -=10;
                break;
            case 'd': 
                X += 10;
                break;
        }        
        this.snake.moveBody();
        //设置head坐标
        try{
            this.snake.X = X;
            this.snake.Y = Y;
        }catch(e: any) {
            this.isLive = false;
            alert(e.message)
        }
        //咬到自己判断
        try {
            this.snake.checkHeadBodyCollision();
        }catch(e: any) {
            this.isLive = false;
            alert(e.message)
        }
        //每300ms就调用一次run(),按照等级提速
        this.isLive && setTimeout(this.run.bind(this),150 - (this.scorepanel.level) * 30);
    }
    checkEat(X:number,Y:number) {
        return X==this.food.X && Y==this.food.Y;
    }
    
}

export default GameControl;