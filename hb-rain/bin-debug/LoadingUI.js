var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        var that = this;
        var bg = new CustomImage("resource/assets/loading/loading_bg.jpg", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);
        this.txtPro = new egret.TextField();
        this.txtPro.textColor = 0xffffff;
        this.txtPro.size = 26;
        this.txtPro.text = "0%";
        this.txtPro.textAlign = egret.HorizontalAlign.CENTER;
        this.txtPro.width = 200;
        this.txtPro.x = StageUtils.SW - this.txtPro.width >> 1;
        this.txtPro.y = 335;
        this.addChild(this.txtPro);
        this.fish = new CustomImage("resource/assets/loading/fish.png", false, function () {
            that.fish.x = StageUtils.SW / 2;
            that.fish.y = 290 + that.fish.height / 2;
            that.fish.anchorOffsetX = that.fish.width / 2;
            that.fish.anchorOffsetY = that.fish.height / 2;
        });
        this.addChild(this.fish);
        this.addEventListener(egret.Event.ENTER_FRAME, function () {
            this.fish.rotation -= 6;
        }, this);
    };
    LoadingUI.prototype.setProgress = function (current, total) {
        // this.textField.text = `Loading...${current}/${total}`;
        var num = Math.floor(current / total * 100) + "%"; //向下取整
        this.txtPro.text = num;
    };
    LoadingUI.prototype.loadComp = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, function () {
            this.fish.rotation += 6;
        }, this);
        UIManager.instance.mainUILayer.removeChild(this);
        UIManager.instance.initMainView();
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map