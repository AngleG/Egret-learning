class ReceivedPop extends PopUp{
	public constructor(){
        super();
        this.show(false);
    }

	public show(hasDelay){
		super.show(hasDelay);
        this.view.y = 0;
		var received = Global.createBitmapByName('isGet_jpg');
		received.width = StageUtils.SW;
		received.height = StageUtils.SH;
        StageUtils.centerInParent(received, 0, 0);
        this.view.addChild(received);
	}
}