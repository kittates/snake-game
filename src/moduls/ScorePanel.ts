class ScorePanel {
    score:  number = 0;
    level:  number = 1;
    scoreELe: HTMLElement;
    levelEle: HTMLElement;

    constructor() {
        this.scoreELe = document.getElementById("score")!;
        this.levelEle = document.getElementById("level")!;
    }
    addScore() {
        this.scoreELe.innerHTML = ++this.score + '';
        if(this.score % 10 ===0 && this.score!==0) this.addLevel();
    }
    addLevel() {
        if(this.level < 10) {
            this.levelEle.innerHTML = ++this.level +'';
        }
    }
}

export default ScorePanel