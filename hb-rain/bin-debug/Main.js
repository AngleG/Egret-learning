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
    function Main() {
        var _this = _super.call(this) || this;
        Main.instance = _this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Object.defineProperty(Main, "USER_INFO_API", {
        get: function () {
            return Main.ROOT + "info?" + Math.random();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Main, "PLAY_API", {
        get: function () {
            return Main.ROOT + "play?" + Math.random();
        },
        enumerable: true,
        configurable: true
    });
    Main.prototype.onAddToStage = function (event) {
        StageUtils.registStage(this.stage);
        this.addChild(UIManager.instance);
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        UIManager.instance.mainUILayer.addChild(this.loadingView);
        this.loadRes();
    };
    Main.prototype.getData = function () {
        var url = window.location.href.split("#")[0].split("?")[1];
        if (url.indexOf("$share") != -1) {
            Main.IS_SHARE = true;
            // Main.type = parseInt(url.substr(url.indexOf("$share")+6));
            Main.username = decodeURI(url.substr(0, url.indexOf("$share")));
        }
        else {
            sessionStorage.setItem("interface", "http://coeasion.cn/");
            sessionStorage.setItem("mainticket", url.substr(0, 32));
        }
        return true;
    };
    Main.prototype.loadData = function () {
        Main.share();
        if (this.getData()) {
            if (Main.IS_SHARE) {
                Main.showPop("Share");
            }
            else {
                var self = this;
                var isAward;
                $.ajax({
                    url: sessionStorage.getItem("interface"),
                    data: { ticket: sessionStorage.getItem("mainticket") },
                    success: function (data) {
                        // self.loadRes();
                        console.log(data);
                        if (data.result == "success") {
                            if (data.pools.length != 0) {
                                UserInfo.instance.isget = false;
                                sessionStorage.setItem("rewardTicket", data.pools[0].ticket);
                                self.loadingView.loadComp();
                            }
                            else {
                                UserInfo.instance.isget = true;
                                Main.showPop("ReceivedPop");
                            }
                        }
                        else {
                            Main.showPop("ErrorPop");
                        }
                    },
                    error: function () {
                        Main.showPop("ErrorPop");
                    },
                    timeout: 8000,
                    dataType: "json", async: true, type: "POST",
                    complete: function (XMLHttpRequest, status) {
                        if (status == 'timeout') {
                        }
                    }
                });
            }
        }
        else {
            Main.showPop("ErrorPop");
        }
    };
    Main.prototype.loadRes = function () {
        //初始化Resource资源加载库
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
        RES.loadGroup("loading");
        // RES.loadGroup("preload"); 
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "loading") {
            RES.loadGroup("preload");
        }
        else if (event.groupName == "preload") {
            this.loadData();
            RES.loadGroup("reward");
        }
        else if (event.groupName == "reward") {
            // this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
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
    Main.showPop = function (popName, data) {
        if (data === void 0) { data = null; }
        var pop = Main.list[popName];
        if (pop) {
            Main.instance.addChild(pop);
            return;
        }
        var popClass = egret.getDefinitionByName(popName);
        var pop = new popClass();
        pop.setData(data);
        Main.instance.addChild(pop);
        Main.list[popName] = pop;
    };
    Main.removePop = function (popName) {
        var pop = Main.list[popName];
        if (pop) {
            if (pop.parent) {
                pop.out();
            }
            Main.list[popName] = null;
            delete Main.list[popName];
        }
    };
    Main.share = function (isEnd) {
        var _this = this;
        if (isEnd === void 0) { isEnd = false; }
        var str1 = "码上有礼 新意加倍";
        var str2 = "玩游戏就能赢红包，最高888元，快去看看!";
        var url = window.location.href.split("#")[0].split("?")[0];
        url = "http://res.leasiondata.cn/lstatic/hbRain/index.html?test$share1";
        //alert("wxIsReady["+eval("$.wxIsReady")+"]");
        if (eval("$.wxIsReady")) {
            var weixin = eval("wx;");
            if (weixin) {
                // alert("sharing["+url+"]");
                weixin.onMenuShareTimeline({
                    title: "【" + str1 + "】" + str2,
                    link: url,
                    imgUrl: "http://res.leasiondata.cn/lstatic/hbRain/share/share.jpg",
                    success: function () {
                        //   alert("sharesuccess");
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        //  alert("sharefail");
                    }
                });
                weixin.onMenuShareAppMessage({
                    title: str1,
                    desc: str2,
                    link: url,
                    imgUrl: "http://res.leasiondata.cn/lstatic/hbRain/share/share.jpg",
                    success: function () {
                        //   alert("sharesuccess2");
                    },
                    cancel: function () {
                        //     alert("sharefail2");
                    }
                });
            }
        }
        else {
            setTimeout(function () {
                _this.share();
            }, 100);
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
Main.ROOT = "http://coeasion.cn/";
Main.isTest = true;
Main.INFO_TICKET = "";
Main.PLAY_TICKET = "";
Main.IS_SHARE = false;
Main.list = {};
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map