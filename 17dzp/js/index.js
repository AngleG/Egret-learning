$(window).load(function () {
    $('.loading').find('p').html("加载完成");
    setTimeout(function () {
        $('.loading').css("display","none");
        $('.page').css("display","block");
    },500);
});
$(document).ready(function () {
    var itemNum = $(".items .item").length;
    var itemDeg = 360 / itemNum;  //每张图片平均偏移的角度

    $('.items .item').each(function (index, element) {
        $(element).css({
            transform: "rotateY(" + index*itemDeg + "deg) translateZ(283px)"
        });
    });
    var originRotate = 0;
    $('#start').bind("touchstart", function () {
        console.log("start");
        var n = Math.floor(Math.random()*9);
        var rotate = originRotate + (360 - originRotate%360) + 720 + n*itemDeg;
        $('.items').css({
            transform: "rotateY(-" + rotate + "deg)"
        });
        
        setTimeout(function () {
            showWin(n);
        }, 4000);
        originRotate = rotate;
    });

    // var showOrHide = true;
    $('#help_btn').bind("touchstart", function () {
        $('.help_mask').fadeIn();
    });
    $('.help_mask').bind("touchstart" ,function () {
        $(this).fadeOut();
    });

    $('#close').bind("touchstart", function () {
        var weixin = eval("wx");
        if(weixin)
        {
            weixin.closeWindow();
        }
    });

    var scrollNum = $('header li').length;
    if(scrollNum > 1){
        var timer = setInterval(function () {
            rolling('header');
        }, 3000);
    }
});
var showWin = function (win) {
    // console.log(win);
    var src = "";
    switch (win){
        case 0:
            src="images/100point.png";
            break;
        case 1:
            src="images/88.png";
            break;
        case 2:
            src="images/20point.png";
            break;
        case 3:
            src="images/50point.png";
            break;
        case 4:
            src="images/10.png";
            break;
        case 5:
            src="images/2.png";
            break;
        case 6:
            src="images/10point.png";
            break;
        case 7:
            src="images/1.png";
            break;
        case 8:
            src="images/30point.png";
            break;
        case 9:
            src="images/5.png";
            break;
    }
    // console.log(src);
    $('.win_tips img').attr("src",src);
    if(src.indexOf("point") == -1){
        $('.win_details img').attr("src","images/cash24h.png");
    }else {
        $('.win_details img').attr("src","images/pointsx.png");
    }
    $('.mask').fadeIn();
}

var rolling = function (obj) {
    $(obj).find('ul').animate({
        marginTop: "-42px"
    },500, function () {
        $(this).css("margin-top","0").find('li:first').appendTo($(this));
    });
}