class GameoverPop extends PopUp{
    public constructor(){
        super();
        this.show(false);
    }

    public show(hasDelay){
        super.show(hasDelay);
        this.view.y = -50;

        var gameOver = Global.createBitmapByName('gameOver_png');
        StageUtils.centerInParent(gameOver, 0, 0);
        this.view.addChild(gameOver);

        var playAgain = Global.createBitmapByName('playAgain_png');
        StageUtils.centerInParent(playAgain, 0, 140);
        this.view.addChild(playAgain);

        playAgain.touchEnabled = true;
        playAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playAgainHandler, this);
    }


    private playAgainHandler():void{
        this.parent.removeChild(this);
        GameView.instance.removeCount();
        GameView.instance.addCount();
        // Main.showPop("GameoverPop");
    }
}