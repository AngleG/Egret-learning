class HelpPop extends PopUp{
    public constructor(){
        super();
        this.show(false);
    }

    public show(hasDelay){
        super.show(hasDelay);

        this.view.y = -50;

        var rwPop = Global.createBitmapByName('help-bg_png');
		StageUtils.centerInParent(rwPop,0,60);
        // rwPop.y = -300;
		this.view.addChild(rwPop);

        var title = Global.createBitmapByName('help-title_png');
		StageUtils.centerInParent(title,0,-380);
		this.view.addChild(title);

        //创建 ScrollView
        var scrollView:egret.ScrollView = new egret.ScrollView();
        //设置滚动区域宽高
        scrollView.width = 473;
        scrollView.height = 720;
		
		// scrollView.y = 480;
        this.view.addChild(scrollView);

        var helpTips = new CustomImage("resource/assets/help.png", true, ()=>{
            scrollView.setContent(helpTips);
            StageUtils.centerInParent(scrollView,0,70);
        });

        var slide = Global.createBitmapByName('slide-up_png');
		StageUtils.centerInParent(slide,0,500);
		this.view.addChild(slide);

        var close = Global.createBitmapByName('close-btn_png');
		StageUtils.centerInParent(close,275,-345);
		this.view.addChild(close);
        close.touchEnabled = true;
       
        close.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            console.log("close popup");
            Main.removePop("HelpPop");
        },this);
    }
}