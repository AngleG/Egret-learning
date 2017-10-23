var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameContainer = (function (_super) {
    __extends(GameContainer, _super);
    function GameContainer() {
        var _this = _super.call(this) || this;
        //敌人的飞机
        _this.enemyFighters = [];
        //触发创建敌机的间隔
        _this.enemyFightersTimer = new egret.Timer(1000);
        //我的子弹
        _this.myBullets = [];
        //敌人的子弹
        _this.enemyBullets = [];
        //我的成绩
        _this.myScore = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    /**
     * 初始化
     */
    GameContainer.prototype.onAddToStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.createGameScene();
    };
    /**
     * 创建游戏场景
     */
    GameContainer.prototype.createGameScene = function () {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        this.bg = new BgMap();
        this.addChild(this.bg);
        this.btnStart = Main.createBitmapByName("btn_start_png");
        this.btnStart.x = (this.stageW - this.btnStart.width) + 160;
        this.btnStart.y = (this.stageH - this.btnStart.height) / 2;
        this.btnStart.width = 150;
        this.btnStart.touchEnabled = true;
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
        this.addChild(this.btnStart);
        this.myFighter = new Airplane(RES.getRes("f1_png"), 100);
        // console.log(this.myFighter);
        this.myFighter.y = this.stageH - this.myFighter.height - 50;
        this.addChild(this.myFighter);
        this.scorePanel = new ScorePanel();
    };
    GameContainer.prototype.gameStart = function () {
        this.myScore = 0;
        this.removeChild(this.btnStart);
        this.bg.startScroll();
        this.touchEnabled = true;
        this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.myFighter.x = (this.stageW - this.myFighter.width) / 2;
        //我的飞机开火
        this.myFighter.fire();
        this.myFighter.blood = 10;
        this.myFighter.addEventListener("createBullet", this.createBulletHandler, this);
        this.enemyFightersTimer.addEventListener(egret.TimerEvent.TIMER, this.createEnemyFighter, this);
        this.enemyFightersTimer.start();
        if (this.scorePanel.parent == this)
            this.removeChild(this.scorePanel);
    };
    //创建敌机
    GameContainer.prototype.createEnemyFighter = function (e) {
        var enemyFighter = Airplane.produce("f2_png", 1000);
        enemyFighter.x = Math.random() * (this.stageW - enemyFighter.width); //随机坐标
        enemyFighter.y = -enemyFighter.height - Math.random() * 300; //随机坐标
        enemyFighter.fire();
        enemyFighter.addEventListener("createBullet", this.createBulletHandler, this);
        this.addChildAt(enemyFighter, this.numChildren - 1);
        this.enemyFighters.push(enemyFighter);
    };
    //创建子弹
    GameContainer.prototype.createBulletHandler = function (e) {
        var bullet;
        if (e.target == this.myFighter) {
            for (var i = 0; i < 2; i++) {
                bullet = Bullet.produce("b1_png");
                bullet.x = i == 0 ? (this.myFighter.x + 10) : (this.myFighter.x + this.myFighter.width - 22);
                bullet.y = this.myFighter.y + 30;
                this.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length); //**???
                this.myBullets.push(bullet);
            }
        }
        else {
            var theFighter = e.target;
            bullet = Bullet.produce("b2_png");
            bullet.x = theFighter.x + 28;
            bullet.y = theFighter.y + 10;
            this.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length);
            this.enemyBullets.push(bullet);
        }
    };
    //游戏界面更新
    GameContainer.prototype.gameViewUpdate = function (evt) {
        //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
        var nowTime = egret.getTimer(); //用于计算相对时间。此方法返回自启动 Egret 框架以来经过的毫秒数。
        var fps = 1000 / (nowTime - this._lastTime);
        this._lastTime = nowTime;
        var speedOffset = 60 / fps;
        //我方子弹运动
        var i = 0;
        var bullet;
        var myBulletsCount = this.myBullets.length;
        var delArr = [];
        for (i; i < myBulletsCount; i++) {
            bullet = this.myBullets[i];
            bullet.y -= 10 * speedOffset;
            if (bullet.y < -bullet.height)
                delArr.push(bullet);
        }
        //回收不显示的子弹
        for (i = 0; i < delArr.length; i++) {
            bullet = delArr[i];
            this.removeChild(bullet);
            Bullet.reclaim(bullet, "b1_png");
            this.myBullets.splice(this.myBullets.indexOf(bullet), 1);
        }
        delArr = [];
        //敌人飞机运动
        var theFighter;
        var enemyFighterCount = this.enemyFighters.length;
        for (var i = 0; i < enemyFighterCount; i++) {
            theFighter = this.enemyFighters[i];
            theFighter.y += 4 * speedOffset;
            if (theFighter.y > this.stageH)
                delArr.push(theFighter);
        }
        //回收不显示的飞机
        for (var i = 0; i < delArr.length; i++) {
            theFighter = delArr[i];
            this.removeChild(theFighter);
            Airplane.reclaim(theFighter, "f2_png");
            theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
            theFighter.stopFire();
            this.enemyFighters.splice(this.enemyFighters.indexOf(theFighter), 1);
        }
        delArr = [];
        //敌人子弹运动
        var enemyBulletsCount = this.enemyBullets.length;
        for (var i = 0; i < enemyBulletsCount; i++) {
            bullet = this.enemyBullets[i];
            bullet.y += 8 * speedOffset;
            if (bullet.y > this.stageH)
                delArr.push(bullet);
        }
        //回收不显示的子弹
        for (var i = 0; i < delArr.length; i++) {
            bullet = delArr[i];
            this.removeChild(bullet);
            Bullet.reclaim(bullet, "b2_png");
            this.enemyBullets.splice(this.enemyBullets.indexOf(bullet), 1);
        }
        this.gameHitTest();
    };
    GameContainer.prototype.touchHandler = function (e) {
        if (e.type == egret.TouchEvent.TOUCH_MOVE) {
            var tx = e.localX; //事件发生点相对于所属显示对象的水平坐标
            tx = Math.max(0, tx);
            tx = Math.min(this.stageW - this.myFighter.width, tx);
            this.myFighter.x = tx;
        }
    };
    //游戏碰撞检测
    GameContainer.prototype.gameHitTest = function () {
        var i, j;
        var bullet;
        var theFighter;
        var myBulletsCount = this.myBullets.length;
        var enemyBulletsCount = this.enemyBullets.length;
        var enemyFighterCount = this.enemyFighters.length;
        //将需消失的子弹和飞机记录
        var delBullets = [];
        var delFighters = [];
        //我的子弹可以消灭敌机
        for (i = 0; i < myBulletsCount; i++) {
            bullet = this.myBullets[i];
            for (j = 0; j < enemyFighterCount; j++) {
                theFighter = this.enemyFighters[j];
                if (GameUtil.hitTest(bullet, theFighter)) {
                    theFighter.blood -= 2;
                    if (delBullets.indexOf(bullet) == -1)
                        delBullets.push(bullet);
                    if (theFighter.blood <= 0 && delFighters.indexOf(theFighter) == -1)
                        delFighters.push(theFighter);
                }
            }
        }
        //敌人的子弹可以减我血
        for (i = 0; i < enemyBulletsCount; i++) {
            bullet = this.enemyBullets[i];
            if (GameUtil.hitTest(this.myFighter, bullet)) {
                this.myFighter.blood -= 1;
                if (delBullets.indexOf(bullet) == -1)
                    delBullets.push(bullet);
            }
        }
        //敌机的撞击可以消灭我
        for (i = 0; i < enemyFighterCount; i++) {
            theFighter = this.enemyFighters[i];
            if (GameUtil.hitTest(this.myFighter, theFighter)) {
                this.myFighter.blood -= 10;
            }
        }
        if (this.myFighter.blood <= 0) {
            this.gameStop();
        }
        else {
            while (delBullets.length > 0) {
                bullet = delBullets.pop();
                this.removeChild(bullet);
                if (bullet.textureName == "b1_png")
                    this.myBullets.splice(this.myBullets.indexOf(bullet), 1);
                else
                    this.enemyBullets.splice(this.enemyBullets.indexOf(bullet), 1);
                Bullet.reclaim(bullet, bullet.textureName);
            }
            this.myScore += delFighters.length;
            while (delFighters.length > 0) {
                theFighter = delFighters.pop();
                theFighter.stopFire();
                theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
                this.removeChild(theFighter);
                this.enemyFighters.splice(this.enemyFighters.indexOf(theFighter), 1);
                Airplane.reclaim(theFighter, "f2_png");
            }
        }
    };
    //游戏结束
    GameContainer.prototype.gameStop = function () {
        var self = this;
        this.addChild(this.btnStart);
        this.bg.pauseScroll();
        this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.myFighter.stopFire();
        this.myFighter.removeEventListener("createBullet", this.createBulletHandler, this);
        this.enemyFightersTimer.removeEventListener(egret.TimerEvent.TIMER, this.createEnemyFighter, this);
        this.enemyFightersTimer.stop();
        //清理子弹
        var i = 0;
        var bullet;
        while (this.myBullets.length > 0) {
            bullet = this.myBullets.pop();
            this.removeChild(bullet);
            Bullet.reclaim(bullet, "b1_png");
        }
        while (this.enemyBullets.length > 0) {
            bullet = this.enemyBullets.pop();
            this.removeChild(bullet);
            Bullet.reclaim(bullet, "b2_png");
        }
        //清理飞机
        var theFighter;
        while (this.enemyFighters.length > 0) {
            theFighter = this.enemyFighters.pop();
            theFighter.stopFire();
            theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
            this.removeChild(theFighter);
            Airplane.reclaim(theFighter, "f2_png");
        }
        //显示成绩
        this.scorePanel.showScore(this.myScore);
        this.scorePanel.x = (this.stageW - this.scorePanel.width) / 2;
        this.scorePanel.y = 100;
        this.addChild(this.scorePanel);
    };
    return GameContainer;
}(egret.DisplayObjectContainer));
__reflect(GameContainer.prototype, "GameContainer");
//# sourceMappingURL=GameContainer.js.map