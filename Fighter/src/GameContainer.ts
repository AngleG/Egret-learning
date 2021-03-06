class GameContainer extends egret.DisplayObjectContainer {

    private btnStart:egret.Bitmap;
    private stageW:number;
    private stageH:number;
    private bg;

    //我的飞机
    private myFighter:Airplane;
    //敌人的飞机
    private enemyFighters:Airplane[] = [];
    //触发创建敌机的间隔
    private enemyFightersTimer:egret.Timer = new egret.Timer(1000);
    //我的子弹
    private myBullets:Bullet[] = [];
    //敌人的子弹
    private enemyBullets:Bullet[] = [];
    
    private _lastTime:number;
    //我的成绩
    private myScore:number = 0;
    //成绩显示
    private scorePanel:ScorePanel;

    public constructor () {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    /**
     * 初始化
     */
    private onAddToStage(e: egret.Event){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.createGameScene();
    }
    /**
     * 创建游戏场景
     */
    private createGameScene():void{
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;

        this.bg = new BgMap();
        this.addChild(this.bg);

        this.btnStart = Main.createBitmapByName("btn_start_png");
        this.btnStart.x = (this.stageW - this.btnStart.width) + 160;
        this.btnStart.y = (this.stageH - this.btnStart.height)/2;
        this.btnStart.width = 150;
        this.btnStart.touchEnabled = true;
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
        this.addChild(this.btnStart);

        this.myFighter = new Airplane(RES.getRes("f1_png"), 100);
        // console.log(this.myFighter);
        this.myFighter.y = this.stageH - this.myFighter.height - 50;
        this.addChild(this.myFighter);
        this.scorePanel = new ScorePanel();
    }

    private gameStart():void {
        this.myScore = 0;
        this.removeChild(this.btnStart);
        this.bg.startScroll();
        this.touchEnabled = true;
        this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.myFighter.x = (this.stageW - this.myFighter.width)/2;
        //我的飞机开火
        this.myFighter.fire();
        this.myFighter.blood = 10;
        this.myFighter.addEventListener("createBullet", this.createBulletHandler, this);
        this.enemyFightersTimer.addEventListener(egret.TimerEvent.TIMER, this.createEnemyFighter, this);
        this.enemyFightersTimer.start();
        if(this.scorePanel.parent == this)
            this.removeChild(this.scorePanel);
        
    }

    //创建敌机
    private createEnemyFighter(e:egret.TimerEvent):void{
        var enemyFighter:Airplane = Airplane.produce("f2_png", 1000);
        enemyFighter.x = Math.random()*(this.stageW - enemyFighter.width);  //随机坐标
        enemyFighter.y = -enemyFighter.height - Math.random()*300;    //随机坐标
        enemyFighter.fire();
        enemyFighter.addEventListener("createBullet", this.createBulletHandler, this);
        this.addChildAt(enemyFighter, this.numChildren - 1);
        this.enemyFighters.push(enemyFighter);
    }

    //创建子弹
    private createBulletHandler(e:egret.Event):void{
        var bullet:Bullet;
        if(e.target == this.myFighter){
            for(var i = 0; i<2; i++){
                bullet = Bullet.produce("b1_png");
                bullet.x = i==0?(this.myFighter.x + 10) : (this.myFighter.x + this.myFighter.width - 22);
                bullet.y = this.myFighter.y + 30;
                this.addChildAt(bullet, this.numChildren-1-this.enemyFighters.length);  //**???
                this.myBullets.push(bullet);
            }
        }else{
            var theFighter:Airplane = e.target;
            bullet = Bullet.produce("b2_png");
            bullet.x = theFighter.x + 28;
            bullet.y = theFighter.y + 10;
            this.addChildAt(bullet, this.numChildren -1 - this.enemyFighters.length);
            this.enemyBullets.push(bullet);
        }
    }

    //游戏界面更新
    private gameViewUpdate(evt:egret.Event):void{
        //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
        var nowTime:number = egret.getTimer();  //用于计算相对时间。此方法返回自启动 Egret 框架以来经过的毫秒数。
        var fps:number = 1000 / (nowTime - this._lastTime);
        this._lastTime = nowTime;
        var speedOffset:number = 60 / fps;
        //我方子弹运动
        var i:number = 0;
        var bullet:Bullet;
        var myBulletsCount:number = this.myBullets.length;
        var delArr:any [] = [];
        for(i; i< myBulletsCount; i++){
            bullet = this.myBullets[i];
            bullet.y -= 10 * speedOffset;
            if(bullet.y < -bullet.height)
                delArr.push(bullet);
        }
        //回收不显示的子弹
        for(i=0; i<delArr.length; i++){
            bullet = delArr[i];
            this.removeChild(bullet);
            Bullet.reclaim(bullet, "b1_png");
            this.myBullets.splice(this.myBullets.indexOf(bullet), 1);
        }
        delArr = [];
        //敌人飞机运动
        var theFighter:Airplane;
        var enemyFighterCount:number = this.enemyFighters.length;
        for(var i=0; i<enemyFighterCount; i++){
            theFighter = this.enemyFighters[i];
            theFighter.y += 4*speedOffset;
            if(theFighter.y > this.stageH)
                delArr.push(theFighter);
        }
        //回收不显示的飞机
        for(var i=0; i<delArr.length; i++){
            theFighter = delArr[i];
            this.removeChild(theFighter);
            Airplane.reclaim(theFighter, "f2_png");
            theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
            theFighter.stopFire();
            this.enemyFighters.splice(this.enemyFighters.indexOf(theFighter),1);
        }
        delArr = [];
        //敌人子弹运动
        var enemyBulletsCount:number = this.enemyBullets.length;
        for(var i=0; i<enemyBulletsCount; i++){
            bullet = this.enemyBullets[i];
            bullet.y += 8*speedOffset;
            if(bullet.y > this.stageH)
                delArr.push(bullet);
        }
        //回收不显示的子弹
        for(var i=0; i<delArr.length; i++){
            bullet = delArr[i];
            this.removeChild(bullet);
            Bullet.reclaim(bullet, "b2_png");
            this.enemyBullets.splice(this.enemyBullets.indexOf(bullet), 1);
        }

        this.gameHitTest();
    }

    private touchHandler(e:egret.TouchEvent):void{
        if(e.type == egret.TouchEvent.TOUCH_MOVE){
            var tx:number = e.localX;  //事件发生点相对于所属显示对象的水平坐标
            tx = Math.max(0, tx);
            tx = Math.min(this.stageW - this.myFighter.width, tx);
            this.myFighter.x = tx;
        }
    }

    //游戏碰撞检测
    private gameHitTest():void{
        var i:number, j:number;
        var bullet:Bullet;
        var theFighter:Airplane;
        var myBulletsCount:number = this.myBullets.length;
        var enemyBulletsCount:number = this.enemyBullets.length;
        var enemyFighterCount:number = this.enemyFighters.length;

        //将需消失的子弹和飞机记录
        var delBullets:Bullet[] = [];
        var delFighters:Airplane[] = [];
        //我的子弹可以消灭敌机
        for(i=0; i<myBulletsCount; i++){
            bullet = this.myBullets[i];
            for(j=0; j<enemyFighterCount; j++){
                theFighter = this.enemyFighters[j];
                if(GameUtil.hitTest(bullet, theFighter)){
                    theFighter.blood -= 2;
                    if(delBullets.indexOf(bullet) == -1)
                        delBullets.push(bullet);
                    if(theFighter.blood <= 0 && delFighters.indexOf(theFighter) == -1)
                        delFighters.push(theFighter);
                }
            }
        }
        //敌人的子弹可以减我血
        for(i=0; i<enemyBulletsCount; i++){
            bullet = this.enemyBullets[i];
            if(GameUtil.hitTest(this.myFighter, bullet)){
                this.myFighter.blood -= 1;
                if(delBullets.indexOf(bullet) == -1)
                    delBullets.push(bullet);
            }
        }
        //敌机的撞击可以消灭我
        for(i=0; i<enemyFighterCount; i++){
            theFighter = this.enemyFighters[i];
            if(GameUtil.hitTest(this.myFighter, theFighter)) {
                this.myFighter.blood -= 10;
            }
        }

        if(this.myFighter.blood <= 0){
            this.gameStop();
        }else{
            while(delBullets.length > 0){
                bullet = delBullets.pop();
                this.removeChild(bullet);
                if(bullet.textureName == "b1_png")
                    this.myBullets.splice(this.myBullets.indexOf(bullet), 1);
                else
                    this.enemyBullets.splice(this.enemyBullets.indexOf(bullet), 1);
                Bullet.reclaim(bullet, bullet.textureName);
            }
            this.myScore += delFighters.length;
            while(delFighters.length > 0){
                theFighter = delFighters.pop();
                theFighter.stopFire();
                theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
                this.removeChild(theFighter);
                this.enemyFighters.splice(this.enemyFighters.indexOf(theFighter), 1);
                Airplane.reclaim(theFighter, "f2_png");
            }
        }
    }
    //游戏结束
    private gameStop():void {
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
        var i:number = 0;
        var bullet:Bullet;
        while(this.myBullets.length > 0 ){
            bullet = this.myBullets.pop();
            this.removeChild(bullet);
            Bullet.reclaim(bullet, "b1_png");
        }
        while(this.enemyBullets.length > 0){
            bullet = this.enemyBullets.pop();
            this.removeChild(bullet);
            Bullet.reclaim(bullet, "b2_png");
        }
        //清理飞机
        var theFighter:Airplane;
        while(this.enemyFighters.length > 0){
            theFighter = this.enemyFighters.pop();
            theFighter.stopFire();
            theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
            this.removeChild(theFighter);
            Airplane.reclaim(theFighter, "f2_png");
        }

        //显示成绩
        this.scorePanel.showScore(this.myScore);
        this.scorePanel.x = (this.stageW-this.scorePanel.width) / 2;
        this.scorePanel.y = 100;
        this.addChild(this.scorePanel);
    }
    
}