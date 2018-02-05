class ErrorPop extends PopUp{
    public constructor(){
        super();
        this.show(false);
    }

    public show(hasDelay){
        super.show(hasDelay);
        this.view.y = -50;
        var error = Global.createBitmapByName('web_error_png');
        StageUtils.centerInParent(error, 0, 60);
        this.view.addChild(error);
    }
}