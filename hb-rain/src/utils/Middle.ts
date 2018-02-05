class Middle extends egret.Sprite{
    //private lable:string
    public constructor(view) {
        super();
        view.x = view.width/-2;
        view.y=view.height/-2;
        this.addChild(view);
    }
}