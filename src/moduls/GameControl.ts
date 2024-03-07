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
        //咬到自己判断
        //必须在移动前检查，否则就可能出现：bodies移动后，head由于之前到达墙边不能移动，从而导致head和bodies有一格重叠，进而撞墙后又咬到自己的错误
        if(this.snake.checkHeadBodyCollision()) {
            this.isLive = false;
            alert("咬到自己了!");
            return;
        }
        
        //检查在当前位置上是否吃到了食物
        if(this.checkEat(X,Y)) {
            this.snake.addBody();
            this.food.change();
            //检查身体是否和食物重叠
            while(this.checkBodyFoodOverlap(this.snake, this.food)) {
                this.food.change();
            }
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
        //必须现将身体部分向前移动，不然会导致头下边的第一块会和head重叠
        this.snake.moveBody();
        //设置head坐标
        this.snake.X = X;
        this.snake.Y = Y;
        // try{
        //     this.snake.X = X;
        //     this.snake.Y = Y;
        // }catch(e: any) {
        //     this.isLive = false;
        //     alert(e.message)
        // }
        
        //检查是否撞墙
        if(this.snake.checkHeadWallCollision()) {
            this.isLive = false;
            alert("撞墙了!");
            return;
        }
        // try {
        //     this.snake.checkHeadBodyCollision();
        // }catch(e: any) {
        //     this.isLive = false;
        //     alert(e.message)
        // }
        //每300ms就调用一次run(),按照等级提速
        this.isLive && setTimeout(this.run.bind(this),150 - (this.scorepanel.level) * 30);
    }
    checkEat(X:number,Y:number) {
        return X==this.food.X && Y==this.food.Y;
    }
    checkBodyFoodOverlap(snake: Snake, food: Food): boolean {
        for(let i=0;i<snake.bodies.length;i++) {
            let bd = snake.bodies[i] as HTMLElement;
            if(bd.offsetLeft==food.X && bd.offsetTop==food.Y) {
                return true;
            }
        }
        return false;
    }
    
}

export default GameControl;