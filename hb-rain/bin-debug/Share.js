var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Share = (function (_super) {
    __extends(Share, _super);
    function Share() {
        var _this = _super.call(this) || this;
        _this.show(false);
        return _this;
    }
    Share.prototype.show = function (hasDelay) {
        _super.prototype.show.call(this, hasDelay);
        this.view.y = 0;
        var share = Global.createBitmapByName('lingqu_jpg');
        share.width = StageUtils.SW;
        share.height = StageUtils.SH;
        StageUtils.centerInParent(share, 0, 0);
        this.view.addChild(share);
        var qrCode = new QRCode("resource/assets/erCode.jpg");
        qrCode.setPosition(195, 470, 264, 264);
        qrCode.showHtmlCode();
        // var ercode = Global.createBitmapByName("erCode_jpg");
        // ercode.width = 264;
        // ercode.height = 264;
        // StageUtils.centerInParent(ercode, 0, 95);
        // this.view.addChild(ercode);
        var gotIt = Global.createBitmapByName("got-it_png");
        StageUtils.centerInParent(gotIt, 0, 370);
        this.view.addChild(gotIt);
        gotIt.touchEnabled = true;
        gotIt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotItHandler, this);
    };
    Share.prototype.gotItHandler = function () {
        var weixin = eval("wx");
        if (weixin) {
            weixin.closeWindow();
        }
    };
    return Share;
}(PopUp));
__reflect(Share.prototype, "Share");
//# sourceMappingURL=Share.js.map