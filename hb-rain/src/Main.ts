
class Main extends egret.DisplayObjectContainer {

    public static ROOT:string = "http://coeasion.cn/";

    public static username;
    
    public static isTest = true;

    public static get USER_INFO_API()
	{
		return Main.ROOT + "info?"+Math.random();
	}

	public static get PLAY_API()
	{
		return Main.ROOT + "play?"+Math.random();
	}

    public static INFO_TICKET = "";
    public static PLAY_TICKET = "";

    public static IS_SHARE = false;

    public static instance:Main;
    /**
     * 加载进度界面
     * Process interface loading
     */
    public loadingView: LoadingUI;

    public constructor() {
        super();
        Main.instance = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        StageUtils.registStage(this.stage);
        this.addChild(UIManager.instance);
        
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        UIManager.instance.mainUILayer.addChild(this.loadingView);

        this.loadRes();
    }


    private getData(){
        var url = window.location.href.split("#")[0].split("?")[1];
        if (url.indexOf("$share")!=-1){
            Main.IS_SHARE = true;
            // Main.type = parseInt(url.substr(url.indexOf("$share")+6));
            Main.username = decodeURI(url.substr(0,url.indexOf("$share")));
        } else {
            sessionStorage.setItem("interface","http://coeasion.cn/");
            sessionStorage.setItem("mainticket",url.substr(0,32));
        }
        return true;
    }

    private loadData():void{
        Main.share();
        if(this.getData()){
            if(Main.IS_SHARE){ 
                              
                Main.showPop("Share");
            }else{
                var self = this;
                var isAward;
                $.ajax({
                    url: sessionStorage.getItem("interface"),
                    data: {ticket: sessionStorage.getItem("mainticket")},
                    success: function(data){
                        // self.loadRes();
                        console.log(data);
                        if(data.result == "success"){
                            if(data.pools.length != 0){
                                UserInfo.instance.isget = false;
                                sessionStorage.setItem("rewardTicket", data.pools[0].ticket);
                                self.loadingView.loadComp();
                            }else{
                                UserInfo.instance.isget = true;
                                Main.showPop("ReceivedPop");
                            }
                        }else{
                            Main.showPop("ErrorPop");
                        }
                    },
                    error: function(){
                        Main.showPop("ErrorPop");
                    },
                    timeout: 8000,
                    dataType: "json",async: true,type: "POST",
                    complete: function(XMLHttpRequest,status)
                    {
                        if(status == 'timeout')
                        {
                        }
                    }
                });
                
            }
        }else{
            Main.showPop("ErrorPop");
        }
    }

    public loadRes():void
    {
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loading");
        
        // RES.loadGroup("preload"); 
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
         if(event.groupName == "loading")
        { 
            RES.loadGroup("preload"); 
        }
       else if (event.groupName == "preload") {
            this.loadData();
           
            RES.loadGroup("reward");

        }
       else if(event.groupName == "reward"){
            // this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            // this.createGameScene();  
        }

    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    
    private static list:any = {};
    public static showPop(popName:string,data:any = null):void
	{
        var pop = Main.list[popName];
        if(pop)
        {
            Main.instance.addChild(pop);
            return;
        }
        var popClass:any = egret.getDefinitionByName(popName);
		var pop = new popClass();
        pop.setData(data);
		Main.instance.addChild(pop);
        Main.list[popName] = pop;
	}

    public static removePop(popName:string):void
    {
        var pop = Main.list[popName];
        if(pop)
        {
            if(pop.parent)
            {
                pop.out();
            }
            Main.list[popName] = null;
            delete Main.list[popName];
        }
    }

    public static share(isEnd = false):void
    {
        var str1 = "码上有礼 新意加倍";
        var str2 = "玩游戏就能赢红包，最高888元，快去看看!";
        
        var url = window.location.href.split("#")[0].split("?")[0];
        url = "http://res.leasiondata.cn/lstatic/hbRain/index.html?test$share1";
       //alert("wxIsReady["+eval("$.wxIsReady")+"]");
		     if(eval("$.wxIsReady"))
		{
            var weixin = eval("wx;");

		        if(weixin)
            {
               // alert("sharing["+url+"]");
		        weixin.onMenuShareTimeline({
                    title: "【"+str1+"】" + str2,
                    link:url,
                    imgUrl:"http://res.leasiondata.cn/lstatic/hbRain/share/share.jpg",
                    success: function () {
                     //   alert("sharesuccess");
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                      //  alert("sharefail");
                    }
                });
                weixin.onMenuShareAppMessage({
                    title:str1,
                    desc: str2,
                    link:url,
                    imgUrl:"http://res.leasiondata.cn/lstatic/hbRain/share/share.jpg",
                    success: function () {
                     //   alert("sharesuccess2");
                    },
                    cancel: function () {
                       //     alert("sharefail2");
                    }
                });
            }
		}else
		{
			setTimeout(()=> 
            {
				this.share();
		    }, 100);
		}
    }

}


