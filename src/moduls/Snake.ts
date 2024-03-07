class Snake {
    head: HTMLElement;
    bodies: HTMLCollection; //里面包含了head
    element:HTMLElement;

    constructor() {
        this.element = document.getElementById("snake")!;
        this.head = document.querySelector("#snake > div")! as HTMLElement;
        this.bodies = this.element.getElementsByTagName("div");
        let top = Math.round(Math.random()*29)*10;
        let left = Math.round(Math.random()*29)*10;
        this.X = left;
        this.Y = top;
    }
    //获取snake坐标,以蛇头为准
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }
    set X(value:number) {
        if(this.X !=value) this.head.style.left = value + 'px';
    }
    set Y(value:number) {
        if(this.Y != value) this.head.style.top = value + 'px';
    }
    //吃到食物时body伸长一节
    addBody() {
        this.element.insertAdjacentHTML("beforeend","<div></div>");
    }
    moveBody() {
        //将后边的身体设置为前一个身体的位置
        for(let i=this.bodies.length-1;i>0;i--) {
            //bodies[i]为Element类型
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    checkHeadBodyCollision() {
        //是否存在相同的X、Y坐标,从身子开始判断
        for(let i=1;i<this.bodies.length;i++) {
            let bd = this.bodies[i] as HTMLElement;
            if(this.X == bd.offsetLeft && this.Y == bd.offsetTop) {
                return true;
            }
        }
        return false;
        
    }
    //撞墙检测
    checkHeadWallCollision() {
        if((this.X<0 || this.X>290) || (this.Y<0 || this.Y>290)) {
            return true;
        }
        return false;
    }
}   

export default Snake;