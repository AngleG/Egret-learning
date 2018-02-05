var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RedPacketItem = (function (_super) {
    __extends(RedPacketItem, _super);
    function RedPacketItem(scaleX, scaleY) {
        var _this = _super.call(this) || this;
        _this.canMove = true;
        var prop = Global.createBitmapByName('hb-rain_png');
        prop.scaleX = scaleX;
        prop.scaleY = scaleY;
        _this.icon = new Middle(prop);
        _this.addChild(_this.icon);
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.clickHandler, _this);
        return _this;
    }
    RedPacketItem.prototype.clickHandler = function () {
        GameView.instance.scoreAdd();
        if (!CountDown.instance.isClick) {
            CountDown.instance.isClick = true;
        }
    };
    return RedPacketItem;
}(egret.DisplayObjectContainer));
__reflect(RedPacketItem.prototype, "RedPacketItem");
//# sourceMappingURL=RedPacketItem.js.map