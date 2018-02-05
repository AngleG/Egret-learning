var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameoverPop = (function (_super) {
    __extends(GameoverPop, _super);
    function GameoverPop() {
        var _this = _super.call(this) || this;
        _this.show(false);
        return _this;
    }
    GameoverPop.prototype.show = function (hasDelay) {
        _super.prototype.show.call(this, hasDelay);
        this.view.y = -50;
        var gameOver = Global.createBitmapByName('gameOver_png');
        StageUtils.centerInParent(gameOver, 0, 0);
        this.view.addChild(gameOver);
        var playAgain = Global.createBitmapByName('playAgain_png');
        StageUtils.centerInParent(playAgain, 0, 140);
        this.view.addChild(playAgain);
        playAgain.touchEnabled = true;
        playAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playAgainHandler, this);
    };
    GameoverPop.prototype.playAgainHandler = function () {
        this.parent.removeChild(this);
        GameView.instance.removeCount();
        GameView.instance.addCount();
        // Main.showPop("GameoverPop");
    };
    return GameoverPop;
}(PopUp));
__reflect(GameoverPop.prototype, "GameoverPop");
//# sourceMappingURL=GameoverPop.js.map