var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SharePop = (function (_super) {
    __extends(SharePop, _super);
    function SharePop() {
        var _this = _super.call(this) || this;
        _this.show(false);
        return _this;
    }
    SharePop.prototype.show = function (hasDelay) {
        _super.prototype.show.call(this, hasDelay);
        this.view.y = -50;
        var share = Global.createBitmapByName('share_png');
        StageUtils.centerInParent(share, 0, -170);
        this.view.addChild(share);
        var okBtn = Global.createBitmapByName('got-it_png');
        StageUtils.centerInParent(okBtn, 0, 245);
        this.view.addChild(okBtn);
        okBtn.touchEnabled = true;
        okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotItHandler, this);
    };
    SharePop.prototype.gotItHandler = function () {
        Main.removePop("SharePop");
    };
    return SharePop;
}(PopUp));
__reflect(SharePop.prototype, "SharePop");
//# sourceMappingURL=SharePop.js.map