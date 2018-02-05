var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.redPacketTimer = new egret.Timer(500);
        _this.id = 0;
        GameView.instance = _this;
        _this.initGameView();
        return _this;
    }
    GameView.prototype.initGameView = function () {
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
        egret.Tween.get(hand).to({ x: 315, y: 380 }, 500).to({ x: 330, y: 390 }, 500).to({ x: 315, y: 380 }, 500).to({ x: 330, y: 390 }, 500).call(function () {
            that.removeChild(hand);
        });
    };
    GameView.prototype.removeCount = function () {
        this.removeChild(this.countDown);
    };
    GameView.prototype.addCount = function () {
        this.countDown = new CountDown();
        this.addChild(this.countDown);
    };
    GameView.prototype.scoreAdd = function () {
        console.log("aaaa");
        if (this.score) {
            this.removeChild(this.score);
        }
        this.id++;
        if (this.id > 25) {
            this.id = 25;
        }
        this.score = new Score(this.id);
        this.score.x = 40;
        this.score.y = StageUtils.SH - this.score.height - 40;
        this.addChild(this.score);
    };
    return GameView;
}(egret.DisplayObjectContainer));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map