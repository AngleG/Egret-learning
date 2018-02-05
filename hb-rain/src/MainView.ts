class MainView extends egret.DisplayObjectContainer{
    public static instance:MainView;
    private startBtn:egret.Bitmap;
    private helpBtn:egret.Bitmap;
    private gametips:egret.Bitmap;

    public constructor(){
        super();
        MainView.instance = this;
        this.initView();
    }

    private initView():void {
        var bg = Global.createBitmapByName('bg_jpg');
        bg.width = StageUtils.SW;
        bg.height = StageUtils.SH;
        bg.x = 0;
        bg.y = 0;
        this.addChild(bg);

        this.helpBtn = Global.createBitmapByName('help-btn_png')
        this.helpBtn.x = StageUtils.SW - this.helpBtn.width - 30;
        this.helpBtn.y = 30;
        this.addChild(this.helpBtn);
        this.helpBtn.touchEnabled = true;
        Global.setBut(this.helpBtn);
        this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.helpHandler, this);

        var theme = Global.createBitmapByName('theme_png');
        StageUtils.centerInParent(theme);
        // theme.y = 190;
        theme.y = -220;
        this.addChild(theme);

        var hb1 = new CustomImage("resource/assets/hbb.png",true, function(){
            hb1.x = 350;
            hb1.y = 110;

            var twhb1 = egret.Tween.get(hb1, {loop: true});
            twhb1.to({y: 90}, 1000).to({y: hb1.y}, 1000);

        });
        this.addChild(hb1);

        var hb2 = new CustomImage("resource/assets/hba.png",true, function(){
            hb2.x = 60;
            hb2.y = 390;

            var twhb2 = egret.Tween.get(hb2, {loop: true});
            twhb2.to({y: 410}, 1000).to({y: hb2.y}, 1000);

        });
        this.addChild(hb2);

        this.gametips = Global.createBitmapByName('click-tips_png');
        // this.gametips.x = StageUtils.SW/2 - this.gametips.width/2;
        // this.gametips.y = 190 + theme.height + 20;
        
        this.gametips.x = StageUtils.SW/2;
        this.gametips.y = 190 + theme.height + 20 + this.gametips.height/2;
        this.gametips.anchorOffsetX = this.gametips.width/2;
        this.gametips.anchorOffsetY = this.gametips.height/2;
        this.gametips.rotation = 0;
        this.addChild(this.gametips);

        this.doudouHandler();
        


        this.startBtn = Global.createBitmapByName('start_png');
        StageUtils.centerInParentX(this.startBtn);
        this.startBtn.y = 830;
        this.addChild(this.startBtn);

        this.startBtn.touchEnabled = true;
        Global.setBut(this.startBtn);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startHandler, this);

        // tw.to({rotation: -20}, 200).to({ rotation: 0}, 200).to({ rotation: 20}, 200).to({ rotation: 0}, 200);

        egret.Tween.get(theme).to({y:190}, 200, ).call(function () {
            // console.log(this);
            egret.Tween.get(theme).to({y: 130},300).call(function(){
                egret.Tween.get(theme).to({y: 190},200).call(function(){
                    egret.Tween.get(theme).to({y: 180}, 120).call(function(){
                         egret.Tween.get(theme).to({y: 190}, 80);
                    });
                });
            });
        });
        
    }

    private startHandler():void{
        console.log("startGame");
        UIManager.instance.mainUILayer.removeChild(this);
        UIManager.instance.showGame();
    }

    private helpHandler():void{
        Main.showPop("HelpPop")
    }

    private doudouHandler():void{
        var self = this;
        egret.Tween.get(this.gametips).wait(1000).to({x: this.gametips.x+10, rotation: 3},100).call(function(){
            egret.Tween.get(self.gametips).to({x: self.gametips.x-20,rotation: -3},100).call(function(){
                egret.Tween.get(self.gametips).to({x: self.gametips.x+20,rotation: 3},100).call(function(){
                    egret.Tween.get(self.gametips).to({x: self.gametips.x-10,rotation: 0}, 100).call(function(){
                        self.doudouHandler();
                    });
                })
            });
        });
    }
    
}