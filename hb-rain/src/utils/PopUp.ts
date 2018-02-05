class PopUp extends egret.Sprite{
    public view:egret.DisplayObjectContainer;

    public data:any;

    public constructor() {
        super();
       
        this.x = 0;
        this.y = 0;
        this.view = new egret.Sprite();

        this.touchEnabled = true;
    }
    public show(hasDelay = false,hasBg=true,now=true){
           
        var delay = 0;
        if(hasDelay) delay = 500;

        var bg=new egret.Shape()
      
        bg.graphics.beginFill(0x0,0.8);
        bg.graphics.drawRect(0,0,StageUtils.stage.stageWidth,StageUtils.stage.stageHeight);
        bg.graphics.endFill();

        // this.view.scaleY = Main.scale;
        // this.view.x=600;
        // this.view.y=320;
        
        if(hasBg)this.addChild(bg);
        this.addChild(this.view);
       
        bg.alpha=this.view.alpha=1;
        
        Global.fadeIn(bg);
       
    }

    public out(){
        Global.fadeOut(this);
        var tw = egret.Tween.get(this.view);
        tw.to({ scaleX: 1.2,scaleY: 1.2 },400,egret.Ease.cubicIn);
        tw.call(function() {
            if(this.parent) {
                this.parent.removeChild(this);
            }
        });
    }

    public setData(data:any = null):void
	{
        this.data = data;
	}
}
