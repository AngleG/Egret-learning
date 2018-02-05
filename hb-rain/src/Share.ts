class Share extends PopUp{
	public constructor(){
        super();
        this.show(false);
    }

	public show(hasDelay){
		super.show(hasDelay);
        this.view.y = 0;
		var share = Global.createBitmapByName('lingqu_jpg');
		share.width = StageUtils.SW;
		share.height = StageUtils.SH;
        StageUtils.centerInParent(share, 0, 0);
        this.view.addChild(share);

        var qrCode:QRCode = new QRCode("resource/assets/erCode.jpg");
        
        qrCode.setPosition(195, 470, 264, 264);
        qrCode.showHtmlCode();

        // var ercode = Global.createBitmapByName("erCode_jpg");
        // ercode.width = 264;
        // ercode.height = 264;
        // StageUtils.centerInParent(ercode, 0, 95);
        // this.view.addChild(ercode);

        var gotIt = Global.createBitmapByName("got-it_png");
        StageUtils.centerInParent(gotIt, 0, 370);
        this.view.addChild(gotIt);

        gotIt.touchEnabled = true;
        gotIt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotItHandler, this);
	}

    private gotItHandler():void{
        var weixin = eval("wx");
        if(weixin)
        {
            weixin.closeWindow();
        }
    }

}