class RedPacket extends egret.DisplayObjectContainer{
    private container:egret.DisplayObjectContainer;
    private listArr: Array<RedPacketItem>;

    public constructor(){
        super();
        this.init();
    }

    private init():void{
        this.container = new egret.DisplayObjectContainer();
        this.addChild(this.container);
        this.listArr = [];
        var hb = Global.createBitmapByName("hb-rain_png");
        var hbWidth = hb.width;
        var hbHeight = hb.height;
        for(var i=-2; i<2; i++){
            for(var j=0; j<4; j++){
                // var scale = Math.random() + 0.2;
                var scale = Math.random()*(0.8-0.4)+0.4;
                // console.log(scale);
                var scaleX=scale;
                var scaleY=scale;
                var prop = new RedPacketItem(scaleX, scaleY);
                this.container.addChild(prop);
                
                if(j==1 || j==3){
                    // prop.x = i * 360 + 350;
                    prop.x = i * 320 - 350;
                }else{

                    // prop.x = i * 350 + 150;
                    prop.x = i * 350 - 150;
                }
                // prop.x = i * 350 + 150;
				prop.y = j * 350 + 150;
				this.listArr.push(prop);
                
            }
        }  

        this.addEventListener(egret.Event.ENTER_FRAME, this.moveStart, this);
        
    }

    public moveStart():void {
        var arr = [];
        var len = this.listArr.length;
        // console.log(len);
        for(var i=0; i<len; i++){
            var prop = this.listArr[i];
            if(prop){
                prop.x += 20;
                prop.y += 20;
            }
            if(prop.x > (StageUtils.SW + prop.width/2+150) || prop.y > (StageUtils.SH + prop.height+50)){
                prop.x = -this.listArr[i].x + StageUtils.SW;
                prop.y = -this.listArr[i].y + StageUtils.SH;
                prop.x += 20;
                prop.y += 20;
                
            }
        }
    }
    
}