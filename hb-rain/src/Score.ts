class Score extends egret.DisplayObjectContainer{
    private id:number;

    public constructor(id){
        super();
        this.id = id;
        
        var score = Global.createBitmapByName("count"+id+"_png");
        this.addChild(score);
    }
}