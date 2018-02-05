class UIManager extends egret.DisplayObjectContainer{
    public static _instance:UIManager;
    public static get instance():UIManager{
        if(!UIManager._instance){
            UIManager._instance = new UIManager();
        }
        return UIManager._instance;
    }

    public mainUILayer:egret.DisplayObjectContainer;

    public constructor(){
        super();
        this.initLayer();
    }

    private initLayer():void{
        this.mainUILayer = new egret.DisplayObjectContainer();
        this.addChild(this.mainUILayer);
    }

    public initMainView():void{
        this.mainUILayer.addChild(new MainView());
    }

    public showGame()
    {
        this.mainUILayer.addChild(new GameView());
    }
}