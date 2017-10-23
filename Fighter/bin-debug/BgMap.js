var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BgMap = (function (_super) {
    __extends(BgMap, _super);
    function BgMap() {
        var _this = _super.call(this) || this;
        //滚动速度
        _this.speed = 2;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    BgMap.prototype.init = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        var texture = RES.getRes("bg_jpg");
        this.textureHeight = texture.textureHeight; //保留原始纹理的高度，用于后续的计算
        this.count = Math.ceil(this.stageH / this.textureHeight) + 1; //计算在当前屏幕中，需要的图片数量
        this.bmpArr = [];
        //创建这些图片并设置y坐标，让它们连接起来
        for (var i = 0; i < this.count; i++) {
            var bgBmp = Main.createBitmapByName("bg_jpg");
            bgBmp.y = this.textureHeight * i - (this.textureHeight * this.count - this.stageH);
            // bgBmp.x = 50;
            this.bmpArr.push(bgBmp);
            this.addChild(bgBmp);
        }
    };
    //滚动 
    BgMap.prototype.startScroll = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    // 逐帧滚动
    BgMap.prototype.enterFrameHandler = function (e) {
        for (var i = 0; i < this.count; i++) {
            var bgBmp = this.bmpArr[i];
            bgBmp.y += this.speed;
            //判断超出屏幕后，回到队首
            if (bgBmp.y > this.stageH) {
                bgBmp.y = this.bmpArr[0].y - this.textureHeight;
                this.bmpArr.pop(); //删除数组最后一个元素 返回被删除的元素
                this.bmpArr.unshift(bgBmp); //向数组头部添加一个元素
            }
        }
    };
    //暂停滚动
    BgMap.prototype.pauseScroll = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    return BgMap;
}(egret.DisplayObjectContainer));
__reflect(BgMap.prototype, "BgMap");
//# sourceMappingURL=BgMap.js.map