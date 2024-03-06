class Food {
    //food所对应的元素
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById("food")!;
        //food初始坐标设置为random
        this.X = this.getRandom();
        this.Y = this.getRandom();
    }

    //获取food的坐标
    get X() {
        return this.element.offsetLeft;
    }
    get Y() {
        return this.element.offsetTop;
    }
    set X(value) {
        this.element.style.left = value + 'px';
    }
    set Y(value) {
        this.element.style.top = value + 'px';
    }

    //food的坐标必须是10的倍数，否则是吃不到的
    change() {
        //TODO:尝试一下Date.now()%29
        let top = this.getRandom();
        let left = this.getRandom();
        this.element.style.left =  left + 'px';
        this.element.style.top = top + 'px';
    }
    getRandom():number {
        return Math.round(Math.random()*29)*10;
    }
}

export default Food;