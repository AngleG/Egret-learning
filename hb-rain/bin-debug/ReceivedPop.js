var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ReceivedPop = (function (_super) {
    __extends(ReceivedPop, _super);
    function ReceivedPop() {
        var _this = _super.call(this) || this;
        _this.show(false);
        return _this;
    }
    ReceivedPop.prototype.show = function (hasDelay) {
        _super.prototype.show.call(this, hasDelay);
        this.view.y = 0;
        var received = Global.createBitmapByName('isGet_jpg');
        received.width = StageUtils.SW;
        received.height = StageUtils.SH;
        StageUtils.centerInParent(received, 0, 0);
        this.view.addChild(received);
    };
    return ReceivedPop;
}(PopUp));
__reflect(ReceivedPop.prototype, "ReceivedPop");
//# sourceMappingURL=ReceivedPop.js.map