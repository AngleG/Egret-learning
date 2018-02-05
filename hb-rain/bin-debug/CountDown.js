var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CountDown = (function (_super) {
    __extends(CountDown, _super);
    function CountDown() {
        var _this = _super.call(this) || this;
        _this.isClick = false;
        _this.index = 5;
        _this.angle = -90;
        CountDown.instance = _this;
        _this.init();
        return _this;
    }
    CountDown.prototype.init = function () {
        this.num = new egret.TextField();
        this.num.text = "5";
        this.num.size = 62;
        this.num.width = 100;
        this.num.x = StageUtils.SW - this.num.width >> 1;
        this.num.y = 73;
        this.num.textAlign = "center";
        this.addChild(this.num);
        this.timer = new egret.Timer(1000, 5);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
        var circle1 = new CustomImage("resource/assets/time-circle1.png", false, function () {
            StageUtils.centerInParentX(circle1);
            circle1.y = 30;
        });
        this.addChild(circle1);
        var circle2 = new CustomImage("resource/assets/time-circle2.png", false, function () {
            StageUtils.centerInParentX(circle2);
            circle2.y = 30;
        });
        this.addChild(circle2);
        this.timeCircle = new egret.Shape();
        var lineX = StageUtils.SW - circle1.width >> 1;
        this.timeCircle.x = lineX;
        this.timeCircle.y = 100;
        this.addChild(this.timeCircle);
        circle2.mask = this.timeCircle;
        egret.startTick(this.movestart, this);
        this.timer.start();
    };
    CountDown.prototype.timerHandler = function () {
        var that = this;
        this.index--;
        console.log(this.index);
        if (this.index > 0) {
            this.num.text = "" + this.index;
        }
        else {
            console.log("红包是否被点击：" + CountDown.instance.isClick);
            //红包被点击
            if (CountDown.instance.isClick) {
                //调接口
                var rewardTicket = sessionStorage.getItem("rewardTicket");
                console.log("rewardTicket: " + rewardTicket);
                if (rewardTicket != undefined) {
                    $.ajax({
                        url: Main.ROOT,
                        data: { ticket: rewardTicket },
                        success: function (data) {
                            console.log(data);
                            if (data.result == "success") {
                                if (data.prizes.length != 0 && data.prizes[0].type) {
                                    Main.showPop("EndView", data);
                                }
                                else {
                                    Main.showPop("ReceivedPop");
                                }
                            }
                            else {
                                Main.showPop("ErrorPop");
                            }
                        },
                        error: function (err) {
                            // Main.showPop("error");
                        },
                        timeout: 80000,
                        dataType: "json", async: true, type: "POST",
                        complete: function (XMLHttpRequest, status) {
                            if (status == 'timeout') {
                            }
                        }
                    });
                }
            }
            else {
                Main.showPop("GameoverPop");
            }
            this.num.text = "" + this.index;
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
            this.timer = null;
        }
    };
    CountDown.prototype.changeGraphics = function (angle) {
        this.timeCircle.graphics.clear();
        this.timeCircle.graphics.lineStyle(20, 0x000000, 1);
        this.timeCircle.graphics.drawArc(0, 0, 60, -90 * Math.PI / 180, angle * Math.PI / 180, false);
        this.timeCircle.graphics.endFill();
    };
    CountDown.prototype.movestart = function (timeStamp) {
        this.angle += 1.25;
        this.changeGraphics(this.angle);
        if (this.angle >= 270) {
            // return false;
            egret.stopTick(this.movestart, this);
        }
        return false;
    };
    return CountDown;
}(egret.DisplayObjectContainer));
__reflect(CountDown.prototype, "CountDown");
//# sourceMappingURL=CountDown.js.map