var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UIManager = (function (_super) {
    __extends(UIManager, _super);
    function UIManager() {
        var _this = _super.call(this) || this;
        _this.initLayer();
        return _this;
    }
    Object.defineProperty(UIManager, "instance", {
        get: function () {
            if (!UIManager._instance) {
                UIManager._instance = new UIManager();
            }
            return UIManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    UIManager.prototype.initLayer = function () {
        this.mainUILayer = new egret.DisplayObjectContainer();
        this.addChild(this.mainUILayer);
    };
    UIManager.prototype.initMainView = function () {
        this.mainUILayer.addChild(new MainView());
    };
    UIManager.prototype.showGame = function () {
        this.mainUILayer.addChild(new GameView());
    };
    return UIManager;
}(egret.DisplayObjectContainer));
__reflect(UIManager.prototype, "UIManager");
//# sourceMappingURL=UIManager.js.map