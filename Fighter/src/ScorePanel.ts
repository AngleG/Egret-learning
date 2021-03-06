class ScorePanel extends egret.Sprite{
    private txt:egret.TextField;
    public constructor(){
        super();
        var g:egret.Graphics = this.graphics;
        g.beginFill(0x000000, 0.8);
        g.drawRect(0, 0, 400, 200);
        g.endFill();
        this.txt = new egret.TextField();
        this.txt.width = 400;
        this.txt.height = 200;
        this.txt.textAlign = "center";
        this.txt.verticalAlign = "center";
        this.txt.textColor = 0xffffff;
        this.txt.size = 24;
        this.addChild(this.txt);
    }

    public showScore(value:number):void{
        var msg:string = "您的成绩是：\n"+ value + "\n再来一次吧！";
        this.txt.text = msg;
    }
}