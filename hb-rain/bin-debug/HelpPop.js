var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HelpPop = (function (_super) {
    __extends(HelpPop, _super);
    function HelpPop() {
        var _this = _super.call(this) || this;
        _this.show(false);
        return _this;
    }
    HelpPop.prototype.show = function (hasDelay) {
        _super.prototype.show.call(this, hasDelay);
        this.view.y = -50;
        var rwPop = Global.createBitmapByName('help-bg_png');
        StageUtils.centerInParent(rwPop, 0, 60);
        // rwPop.y = -300;
        this.view.addChild(rwPop);
        var title = Global.createBitmapByName('help-title_png');
        StageUtils.centerInParent(title, 0, -380);
        this.view.addChild(title);
        //创建 ScrollView
        var scrollView = new egret.ScrollView();
        //设置滚动区域宽高
        scrollView.width = 473;
        scrollView.height = 720;
        // scrollView.y = 480;
        this.view.addChild(scrollView);
        var helpTips = new CustomImage("resource/assets/help.png", true, function () {
            scrollView.setContent(helpTips);
            StageUtils.centerInParent(scrollView, 0, 70);
        });
        var slide = Global.createBitmapByName('slide-up_png');
        StageUtils.centerInParent(slide, 0, 500);
        this.view.addChild(slide);
        var close = Global.createBitmapByName('close-btn_png');
        StageUtils.centerInParent(close, 275, -345);
        this.view.addChild(close);
        close.touchEnabled = true;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            console.log("close popup");
            Main.removePop("HelpPop");
        }, this);
    };
    return HelpPop;
}(PopUp));
__reflect(HelpPop.prototype, "HelpPop");
//# sourceMappingURL=HelpPop.js.map