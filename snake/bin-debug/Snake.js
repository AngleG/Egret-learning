var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake(x, y, r, color) {
        var _this = _super.call(this) || this;
        // 蛇身的全部节点List
        _this.bodyList = [];
        _this.speed = 20;
        _this.init(x, y, r, color);
        return _this;
    }
    Snake.prototype.init = function (x, y, r, color) {
        // 绘制蛇头
        this.head = new egret.Shape();
        this.head.graphics.beginFill(color);
        this.head.graphics.lineStyle(10, 0xff4777);
        this.head.graphics.drawCircle(r, r, r);
        this.head.graphics.endFill();
        // 设置蛇头在蛇身的位置
        this.head.x = 0;
        this.head.y = 0;
        this.radius = r;
        // 设置蛇身的位置
        this.x = x;
        this.y = y;
        // 将蛇头添加到蛇身的list
        this.bodyList.push(this.head);
        // 将蛇头加入到蛇身中并指定显示索引为最大，以保证蛇头永远在蛇身其他节点的上方
        this.addChild(this.bodyList[this.bodyList.length - 1]);
        this.setChildIndex(this.bodyList[this.bodyList.length - 1], -999); //容器.setChildIndex( 显示对象, 新的深度值 );
    };
    // 吃食物后增加节点  食物的颜色
    Snake.prototype.afterEat = function (color) {
        // 新增的节点
        var node = new egret.Shape();
        node.graphics.beginFill(color);
        node.graphics.drawCircle(this.radius, this.radius, this.radius);
        node.graphics.endFill();
        //指定新增节点的位置在蛇身节点list的最后一个节点，也就是蛇尾的一个坐标偏移（这里可以随便指定合理的位置即可）
        node.x = this.bodyList[this.bodyList.length - 1].x - this.radius * 0.6;
        node.y = this.bodyList[this.bodyList.length - 1].y - this.radius * 0.6;
        // 将新增节点添加到蛇身和蛇身节点list
        this.bodyList.push(node);
        this.addChild(this.bodyList[this.bodyList.length - 1]);
        //将新增节点放到所有节点最下边
        this.setChildIndex(this.bodyList[this.bodyList.length - 1], 0);
    };
    Snake.prototype.move = function (e, during) {
        // 获取点击坐标
        var clickX = e.stageX;
        var clickY = e.stageY;
        var tween;
        for (var i = this.bodyList.length - 1; i >= 1; i--) {
            tween = egret.Tween.get(this.bodyList[i]);
            tween.to({ x: this.bodyList[i - 1].x, y: this.bodyList[i - 1].y }, during);
        }
        //我们前面知道蛇身节点list的首个节点其实就是蛇头
        //让它在蛇中的偏移坐标加上蛇在舞台中的坐标，便可以得到全局坐标
        var globalX = this.x + this.bodyList[0].x;
        var globalY = this.y + this.bodyList[0].y;
        // console.log("全局坐标：" + globalX + "," + globalY);
        // console.log("this.x:" + this.x + "this.y:" + this.y);
        // console.log("head.x:" + this.bodyList[0].x + " head.y:" + this.bodyList[0].y);
        // 设置当前缓动对象为蛇头
        tween = egret.Tween.get(this.bodyList[0]);
        var tmpx, tmpy;
        if (globalX == clickX && globalY == clickY) {
            // 位置相同
            return;
        }
        if (globalX != clickX) {
            //非垂直
            // 斜率
            var k = (clickY - globalY) / (clickX - globalX);
            // 角度
            var angle = Math.atan(k);
            if (clickX < globalX) {
                //左边
                tmpx = this.bodyList[0].x - this.speed * Math.cos(angle);
                tmpy = this.bodyList[0].y - this.speed * Math.sin(angle);
                tween.to({ x: tmpx, y: tmpy }, during);
            }
            else {
                //右边
                tmpx = this.bodyList[0].x + this.speed * Math.cos(angle);
                tmpy = this.bodyList[0].y + this.speed * Math.sin(angle);
                tween.to({ x: tmpx, y: tmpy }, during);
            }
        }
        else {
            //垂直
            if (clickX < globalX) {
                //水平向左
                tmpx = this.bodyList[0].x - this.speed;
                tween.to({ x: tmpx, y: tmpy }, during);
            }
            else {
                //水平向右
                tmpx = this.bodyList[0].x + this.speed;
                tween.to({ x: tmpx, y: tmpy }, during);
            }
        }
    };
    Snake.prototype.getHead = function () {
        return this.bodyList[0];
    };
    return Snake;
}(egret.Sprite));
__reflect(Snake.prototype, "Snake");
//# sourceMappingURL=Snake.js.map