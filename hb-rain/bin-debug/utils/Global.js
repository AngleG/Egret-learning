var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Global = (function () {
    function Global() {
    }
    Global.setBut = function (sp) {
        if (sp) {
            sp.touchEnabled = true;
            sp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () { sp.alpha = 0.68; }, sp);
            sp.addEventListener(egret.TouchEvent.TOUCH_END, function () { sp.alpha = 1; }, sp);
            sp.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () { sp.alpha = 1; }, sp);
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Global.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Global.fadeIn = function (m, d, t, sc) {
        if (d === void 0) { d = 0; }
        if (t === void 0) { t = 500; }
        if (sc === void 0) { sc = 1; }
        Global.tweenFrom(m, d, t, 0, 0, sc, egret.Ease.cubicOut);
    };
    Global.fadeOut = function (m, d, t, sc) {
        if (d === void 0) { d = 0; }
        if (t === void 0) { t = 500; }
        if (sc === void 0) { sc = 1; }
        Global.tweenToHide(m, d, t, 0, 0, sc, egret.Ease.cubicOut);
    };
    Global.tweenFrom = function (m, d, t, ox, oy, sc, ease) {
        var tw = egret.Tween.get(m);
        var xx = m.x;
        var yy = m.y;
        //var w = m.width;
        // var h = m.height;
        m.scaleX = m.scaleY = sc;
        m.x = xx + ox; // + (1 - sc) / 2 * w;
        m.y = yy + oy; // + (1 - sc) / 2 * h;
        tw.wait(d);
        tw.to({ alpha: 1, scaleX: 1, scaleY: 1, x: xx, y: yy }, t, ease);
    };
    Global.tweenToHide = function (m, d, t, ox, oy, sc, ease, alpha) {
        if (alpha === void 0) { alpha = 0; }
        var tw = egret.Tween.get(m);
        var xx = m.x;
        var yy = m.y;
        //var w = m.width;
        //var h = m.height;
        xx = xx + ox; // + (1 - sc) / 2 * w;
        yy = yy + oy; // + (1 - sc) / 2 * h;
        tw.wait(d);
        tw.to({ alpha: alpha, scaleX: sc, scaleY: sc, x: xx, y: yy }, t, ease);
        tw.call(function () {
            if (m.parent)
                m.parent.removeChild(m);
        });
    };
    return Global;
}());
__reflect(Global.prototype, "Global");
//# sourceMappingURL=Global.js.map