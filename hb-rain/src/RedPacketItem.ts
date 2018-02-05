class RedPacketItem extends egret.DisplayObjectContainer{

    private icon:Middle;
    private canMove:boolean;
    
    
    public constructor(scaleX:number, scaleY:number){
        super();
        this.canMove = true;
        var prop = Global.createBitmapByName('hb-rain_png');
        prop.scaleX = scaleX;
        prop.scaleY = scaleY;
        this.icon = new Middle(prop);
        this.addChild(this.icon);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler():void{
        GameView.instance.scoreAdd();
        
        if(!CountDown.instance.isClick){
            CountDown.instance.isClick = true;
        }
    }
   
}