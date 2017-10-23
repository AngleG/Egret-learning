var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Airplane = (function (_super) {
    __extends(Airplane, _super);
    function Airplane(texture, bulletDelay) {
        var _this = _super.call(this) || this;
        //飞机生命值
        _this.blood = 10;
        _this.bulletDelay = bulletDelay;
        _this.airPlane = new egret.Bitmap(texture);
        _this.addChild(_this.airPlane);
        _this.fireTimer = new egret.Timer(bulletDelay);
        _this.fireTimer.addEventListener(egret.TimerEvent.TIMER, _this.createBullet, _this);
        return _this;
    }
    Airplane.prototype.createBullet = function (e) {
        this.dispatchEventWith("createBullet");
    };
    //开火
    Airplane.prototype.fire = function () {
        this.fireTimer.start();
    };
    //关火
    Airplane.prototype.stopFire = function () {
        this.fireTimer.stop();
    };
    //创建飞机
    Airplane.produce = function (textureName, bulletDelay) {
        if (Airplane.cacheDict[textureName] == null) {
            Airplane.cacheDict[textureName] = [];
        }
        var dict = Airplane.cacheDict[textureName];
        var theAirplane;
        if (dict.length > 0) {
            theAirplane = dict.pop();
        }
        else {
            theAirplane = new Airplane(RES.getRes(textureName), bulletDelay);
        }
        theAirplane.blood = 10;
        return theAirplane;
    };
    //回收飞机
    Airplane.reclaim = function (theAirplane, textureName) {
        if (Airplane.cacheDict[textureName] == null)
            Airplane.cacheDict[textureName] = [];
        var dict = Airplane.cacheDict[textureName];
        if (dict.indexOf(theAirplane) == -1)
            dict.push(theAirplane);
    };
    return Airplane;
}(egret.DisplayObjectContainer));
//需要创建飞机的时候，调用produce方法，不需要的飞机实例通过reclaim方法回收，这样可以保持对象数量在一个稳定的水平。
Airplane.cacheDict = {};
__reflect(Airplane.prototype, "Airplane");
//# sourceMappingURL=Airplane.js.map