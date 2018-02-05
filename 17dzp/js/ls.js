$.shareObj={link:"http://res.leasiondata.cn/lstatic/t/share/index.html",
			imgUrl:"http://res.leasiondata.cn/lstatic/t/share.jpg",
			copy:"码上来战 红包百万"};
$.wxIsReady=false;
$.wxConfig=null;
var loadWx=function(){
	$.ajax({
		url: "http://coeasion.cn/",
		data: {url4wxjssdk:(window.location.href.split("#")[0])},//encodeURIComponent
		success: function(data) {
			if(data) {
				$.wxConfig=data;
				initWx();
			}
		},
		dataType: "json",async: false,type: "POST"
	});
}
$.setWxObj=function(){
	if(wx && $.wxConfig){
		wx.onMenuShareTimeline({
				title: $.shareObj.copy,
				link:$.shareObj.link,
				imgUrl:$.shareObj.imgUrl,
				success: function () {

				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
			wx.onMenuShareAppMessage({
				title:$.shareObj.copy,
				desc: '',
				link:$.shareObj.link,
				imgUrl:$.shareObj.imgUrl,
				success: function () {

				},
				cancel: function () {

				}
			});
	}
}
$.addCard=function(obj,cardList,success,cancel){
	if(wx){
		wx.addCard({
	      cardList:cardList,
	      /* 
	      [
	        {
	          cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
	          cardExt: '{"code": "", "openid": "", "timestamp": "1418301401", "signature":"ad9cf9463610bc8752c95084716581d52cd33aa0"}'
	        },
	        {
	          cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
	          cardExt: '{"code": "", "openid": "", "timestamp": "1418301401", "signature":"ad9cf9463610bc8752c95084716581d52cd33aa0"}'
	        }
	      ],*/
	      success: function (res) {
	        //alert('已添加卡券：' + JSON.stringify(res.cardList));
	         success.call(obj,res);
	      },
	      cancel: function (res) {
	        cancel.call(obj,res);
	        //alert(JSON.stringify(res))
	      }
	    });
	} 
}
var initWx=function(){
	if(wx && $.wxConfig){
		wx.ready(function() {
			$.wxIsReady=true;
			$.setWxObj();
			
		});
		//alert($.wxConfig.appId+":"+$.wxConfig.timestamp+":"+$.wxConfig.nonceStr+":"+$.wxConfig.signature);
		wx.config({
			debug: false,
			appId: $.wxConfig.appId,
			timestamp:$.wxConfig.timestamp,
			nonceStr:$.wxConfig.nonceStr,
			signature:$.wxConfig.signature,
			jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","addCard"]
		});
	}
}
$(document).ready(function(){
	setTimeout(function(){
		loadWx();
	},1000);
});


