class Airplane extends egret.DisplayObjectContainer {
    //飞机位图
    private airPlane:egret.Bitmap;
    //创建子弹的时间间隔
    private bulletDelay:number;
    //定时发射
    private fireTimer:egret.Timer;
    //飞机生命值
    public blood:number = 10;

    public constructor (texture: egret.Texture, bulletDelay:number){
        super();
        this.bulletDelay = bulletDelay;
        this.airPlane = new egret.Bitmap(texture);
        this.addChild(this.airPlane);
        this.fireTimer = new egret.Timer(bulletDelay);
        this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
    }
    private createBullet(e:egret.TimerEvent):void{
        this.dispatchEventWith("createBullet");
    }
    //开火
    public fire():void {
        this.fireTimer.start();
    }
    //关火
    public stopFire():void {
        this.fireTimer.stop();
    }


    //需要创建飞机的时候，调用produce方法，不需要的飞机实例通过reclaim方法回收，这样可以保持对象数量在一个稳定的水平。
    private static cacheDict:Object = {};
    //创建飞机
    public static produce(textureName:string, bulletDelay:number):Airplane {
        if(Airplane.cacheDict[textureName] == null){
            Airplane.cacheDict[textureName] = [];
        }
        var dict:Airplane[] = Airplane.cacheDict[textureName];
        var theAirplane:Airplane;
        if(dict.length>0){
            theAirplane = dict.pop();
        }else{
            theAirplane = new Airplane(RES.getRes(textureName), bulletDelay);
        }
        theAirplane.blood = 10;
        return theAirplane;
    }
    //回收飞机
    public static reclaim(theAirplane:Airplane, textureName:string):void {
        if(Airplane.cacheDict[textureName] == null)
            Airplane.cacheDict[textureName] = [];

        var dict:Airplane[] = Airplane.cacheDict[textureName];
        if(dict.indexOf(theAirplane) == -1)
            dict.push(theAirplane);
    }
}