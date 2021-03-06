var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EndView = (function (_super) {
    __extends(EndView, _super);
    function EndView() {
        var _this = _super.call(this) || this;
        _this.show(false);
        return _this;
    }
    EndView.prototype.setData = function (data) {
        if (data === void 0) { data = null; }
        this.view.y = -50;
        var self = this;
        this.data = data;
        var light = Global.createBitmapByName('light_png');
        // StageUtils.centerInParent(light);
        light.x = StageUtils.SW / 2;
        light.y = StageUtils.SH / 2;
        light.anchorOffsetX = light.width / 2;
        light.anchorOffsetY = light.height / 2;
        light.rotation = 0;
        this.view.addChild(light);
        egret.Tween.get(light, { loop: true }).to({ alpha: 0.5 }).to({ alpha: 1 });
        setInterval(function () {
            light.rotation += 6;
        }, 100);
        var rewardBg = Global.createBitmapByName('reward-bg_png');
        StageUtils.centerInParent(rewardBg, 15, 0);
        this.view.addChild(rewardBg);
        var rewardData = { desc: "cash", value: 10 };
        // var rewardData = {desc: "coupon"};
        if (data) {
            var reward = new CustomImage("resource/assets/reward/" + data.prizes[0].type + ".png", true, function () {
                reward.x = StageUtils.SW - reward.width >> 1;
                reward.y = StageUtils.CH - 200;
            });
            this.view.addChild(reward);
            if (data.prizes[0].type == "cash") {
                var value = new CustomImage("resource/assets/reward/" + data.prizes[0].value + ".png", true, function () {
                    value.x = StageUtils.SW - value.width >> 1;
                    value.y = StageUtils.CH + 70;
                });
                this.view.addChild(value);
                var hbtips = Global.createBitmapByName("hbtips_png");
                StageUtils.centerInParent(hbtips, 0, 290);
                this.view.addChild(hbtips);
                this.getHb = Global.createBitmapByName("getHb-btn_png");
                StageUtils.centerInParent(this.getHb, -140, 450);
                this.view.addChild(this.getHb);
                this.getHb.touchEnabled = true;
                this.getHb.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getHbHandler, this);
                var share = Global.createBitmapByName("share-btn_png");
                StageUtils.centerInParent(share, 140, 450);
                this.view.addChild(share);
                share.touchEnabled = true;
                share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareHandler, this);
            }
            if (data.prizes[0].type == "link") {
                var value = new CustomImage("resource/assets/reward/" + data.prizes[0].desc + ".png", true, function () {
                    value.x = StageUtils.SW - value.width >> 1;
                    value.y = StageUtils.CH + 70;
                });
                this.view.addChild(value);
                var cptips = Global.createBitmapByName("coupontips_png");
                StageUtils.centerInParent(cptips, 0, 290);
                this.view.addChild(cptips);
                this.getCp = Global.createBitmapByName("getCoupon-btn_png");
                StageUtils.centerInParent(this.getCp, 0, 450);
                this.view.addChild(this.getCp);
                this.getCp.touchEnabled = true;
                this.getCp.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    window.location.href = data.prizes[0].value;
                }, this);
            }
        }
    };
    EndView.prototype.getHbHandler = function () {
        //领取红包
        if (this.getHb) {
            this.view.removeChild(this.getHb);
            var getok = Global.createBitmapByName("btn-ok_png");
            StageUtils.centerInParent(getok, -140, 450);
            this.view.addChild(getok);
        }
    };
    EndView.prototype.shareHandler = function () {
        Main.showPop("SharePop");
    };
    return EndView;
}(PopUp));
__reflect(EndView.prototype, "EndView");
//# sourceMappingURL=EndView.js.map