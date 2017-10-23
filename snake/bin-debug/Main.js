//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main(x, y, r) {
        var _this = _super.call(this) || this;
        _this.radius = 30;
        _this.color = 0x4c8dae;
        _this.during = 40;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    Main.prototype.createGameScene = function () {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        // 生产随机食物
        this.randomFood();
        //生成彩虹蛇
        this.snake = new Snake(this.stageW * 0.5, this.stageH * 0.5, this.radius, 0x000000);
        this.addChild(this.snake);
        // 开启舞台点击事件
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.move, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.moveEnd, this);
    };
    // 随机生成食物
    Main.prototype.randomFood = function () {
        //随机坐标
        var tmpx = Math.random() * (this.stageW - this.radius * 2);
        var tmpy = Math.random() * (this.stageH - this.radius * 2);
        //新建食物对象
        this.food = new Food(tmpx, tmpy, this.radius);
        //显示
        this.addChild(this.food);
    };
    //食物被吃
    Main.prototype.onEat = function () {
        //移除舞台上的食物
        this.removeChild(this.food);
        //调用彩虹蛇吃食物的事件
        this.snake.afterEat(this.food.color);
        //随机产生食物
        this.randomFood();
    };
    //点击事件
    Main.prototype.move = function (e) {
        this.snake.move(e, this.during);
    };
    // 点击时拖动
    Main.prototype.onMove = function (e) {
        //保存
        this.moveEvent = e;
        // 开启一个定时器
        if (this.timer == null) {
            this.timer = new egret.Timer(this.during);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.timer.start();
        }
    };
    //点击结束
    Main.prototype.moveEnd = function (e) {
        //关闭定时器
        if (this.timer != null) {
            this.timer.stop();
            this.timer = null;
        }
    };
    //计时器逻辑
    Main.prototype.onTimer = function (e) {
        //获取蛇头
        this.head = this.snake.getHead();
        //调用方法，检测蛇头和事物是否发生碰撞
        if (this.hit(this.head, this.food))
            //发生碰撞 则调用食物被吃事件
            this.onEat();
        this.snake.move(this.moveEvent, this.during);
    };
    //使用包装盒检测碰撞
    Main.prototype.hit = function (a, b) {
        return (new egret.Rectangle(a.x + this.snake.x, a.y + this.snake.y, a.width, a.height)).intersects(new egret.Rectangle(b.x, b.y, b.width, b.height));
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map