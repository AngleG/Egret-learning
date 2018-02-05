
class LoadingUI extends egret.Sprite {

    private fish:egret.Bitmap;

    private btnReturn:egret.Bitmap;

    private txtLastime:egret.TextField;

    private txtLastime1:egret.TextField;

    private rectMask:egret.Rectangle;

    private isload;

    private txtPro:egret.TextField;

    public constructor() {
        super();
        this.createView();
    }

    private textField:egret.TextField;

    private createView():void {
        var that = this;
        var bg = new CustomImage("resource/assets/loading/loading_bg.jpg",true, function(){
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);

        this.txtPro = new egret.TextField();
        this.txtPro.textColor = 0xffffff;
        this.txtPro.size = 26;
        this.txtPro.text = "0%";
        this.txtPro.textAlign = egret.HorizontalAlign.CENTER;
        this.txtPro.width = 200;
        this.txtPro.x = StageUtils.SW - this.txtPro.width >> 1;
        this.txtPro.y = 335;
        this.addChild(this.txtPro);

        this.fish = new CustomImage("resource/assets/loading/fish.png", false, function(){
            that.fish.x = StageUtils.SW/2;
            that.fish.y = 290 + that.fish.height/2;
            that.fish.anchorOffsetX= that.fish.width/2;
            that.fish.anchorOffsetY= that.fish.height/2;
        });
       

        this.addChild(this.fish);
        this.addEventListener( egret.Event.ENTER_FRAME, function(){
            this.fish.rotation-=6;
        }, this);
       
    }

    public setProgress(current:number, total:number):void {
        // this.textField.text = `Loading...${current}/${total}`;
        var num = Math.floor(current / total * 100) + "%";    //向下取整
        this.txtPro.text = num;
    }

    public loadComp():void{
        this.removeEventListener(egret.Event.ENTER_FRAME, function(){
            this.fish.rotation+=6;
        }, this);
        UIManager.instance.mainUILayer.removeChild(this);
        UIManager.instance.initMainView();
    }
}
