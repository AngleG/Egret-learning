class SharePop extends PopUp{
    public constructor(){
        super();
        this.show(false);
    }

    public show(hasDelay){
        super.show(hasDelay);
        this.view.y = -50;
        var share = Global.createBitmapByName('share_png');
        StageUtils.centerInParent(share, 0,-170);
        this.view.addChild(share);

        var okBtn = Global.createBitmapByName('got-it_png');
        StageUtils.centerInParent(okBtn, 0, 245);
        this.view.addChild(okBtn);

        okBtn.touchEnabled = true;
        okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotItHandler, this);
    }

    private gotItHandler():void{
        Main.removePop("SharePop");
    }
}