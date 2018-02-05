class GameView extends egret.DisplayObjectContainer{

    private countDown:CountDown;

    private redPacketTimer:egret.Timer = new egret.Timer(500);

    private redpacketList:RedPacket;

    public score:Score;

    public id:number=0;

    public static instance:GameView;

    public constructor(){
        super();
        GameView.instance = this;
        this.initGameView();
    }

    private initGameView():void{
        var that = this;
        var bg = Global.createBitmapByName('bg_jpg');
        bg.width = StageUtils.SW;
        bg.height = StageUtils.SH;
        bg.x = 0;
        bg.y = 0;
        this.addChild(bg);
        

        this.redpacketList = new RedPacket();
        this.addChild(this.redpacketList);

        this.addCount();

        var hand = Global.createBitmapByName("hand_png");
        hand.x = 330;
        hand.y = 390;
        this.addChild(hand);
        egret.Tween.get(hand).to({x: 315, y: 380}, 500).to({x: 330, y: 390}, 500).to({x: 315, y: 380}, 500).to({x: 330, y: 390}, 500).call(function(){
            that.removeChild(hand);
        });
    }
    
    public removeCount():void{
        this.removeChild(this.countDown);
    }

    public addCount():void{
        this.countDown = new CountDown();
        this.addChild(this.countDown);
    }
    

    public scoreAdd(){
        console.log("aaaa");
        if(this.score){
            this.removeChild(this.score);
        }
        this.id++;
        if(this.id > 25){
            this.id = 25;
        }
        this.score = new Score(this.id);
        this.score.x = 40;
        this.score.y = StageUtils.SH - this.score.height - 40;
        
        this.addChild(this.score);
    }

}