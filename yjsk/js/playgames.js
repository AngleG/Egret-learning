$(function () {
	// 倒计时
	var i =0;
	var countDown = document.getElementById('countDown');
	var go = document.getElementById('go');
	var audioClick = document.getElementById('audioClick');
	// setInterval(function () {countDown.play();},300);
	var timer = setInterval(function () {
		if( i < 3){
			// $('#time').find('span').removeClass('on').eq(i).addClass('on');
			countDown.play();
			countDown.currentTime = 0;
			$('#time').find('span').css("display", "none").eq(i).css("display", "block");

			
		}else if( i == 3){
			$('#time').find('span').css("display", "none").eq(i).css("display", "block");
			go.play();
		}else{
			// $('#time').find('span').removeClass('on');
			$('#time').find('span').css("display", "none");
			
			
			$('#tips').css("display", "none");
			clearInterval(timer);
			//商品滚动
			var timer1 = setInterval(scroll, 30);
			//提示文字
			$('#prompt').css("display", "block");

		}
		i++;
		
	},1000);
	
	// 商品滚动
	var iLeft = 0;
	var iWidth = $('.goods').width();
	
	function scroll(){
		if(iLeft == -iWidth){
			iLeft = 0;
		}
		iLeft -= 1;
		// $('#goodsbox').animate({
		// 	"left": iLeft
		// });
		$('#goodsbox').css("left", iLeft);

	}
	//提示文字
	$('#prompt').click(function () {
		$(this).css("display", "none");
		timer2 = setInterval(random, 1300);
	});
	
	//商品随机晃动  Math.floor(Math.random()*10);  // 0~9随机整数
	var timer2;
	function random() {
		$('.goods').find('li').removeClass("active");
		var index = Math.floor(Math.random()*(7-0+1)+0);
		var ulIndex = Math.floor(Math.random()*(5-0+1)+0);
		// console.log(ulIndex);

		var iOffsetL = $('#goodsbox').find('ul').eq(ulIndex).find('li').eq(index).offset().left;
		if( iOffsetL > 0 && iOffsetL < $(window).width() ){
		// console.log('111');

			$('#goodsbox').find('ul').eq(ulIndex).find('li').eq(index).addClass("active");

			$('#goodsbox').find('ul').eq(ulIndex).find('li').eq(index).click(function () {
				audioClick.play();
				// console.log("123");
				var _height = $(window).height();
				var iOffsetTop = $(this).offset().top;
				var iOffsetLeft = $(this).offset().left;
				var carHeight = $('#standman').height()/3;
				var thisHeight = $(this).height();
				var thisWidth = $(this).width();

				var RandomDeg = -Math.floor(Math.random()*(3-0+1)+0)*10;
				var iRandom = -Math.floor(Math.random()*(5-1+1)+1);
				console.log(RandomDeg + "deg");
				console.log(iRandom + " random");
				// 切换帧动画
				document.getElementById('play').play();
				$('#standman').addClass("on");

				$(this).children().animate({
					"top": _height - iOffsetTop - thisHeight -carHeight
				}, 800, function () {
					$(this).appendTo($('#props'));
					$(this).css({
						"width": thisWidth - 10,
						"position": "absolute",
						"top": "112px",
						"left": 32 + iRandom + "px",
						"zIndex": -1,
						"transform": "rotate(" + (-30 + RandomDeg) + "deg)"
					});
					// 游戏结束
					if($('#props').find('img').length >= 3){
						document.getElementById('gameover').play();
						clearInterval(timer2);
						$('#over').show(300);
					}
				});
				
				
				$('#rmbox').animate({
					"left": iOffsetLeft - 60
				}, 800 , function () {
					document.getElementById('play').pause();
					$('#standman').removeClass("on");
				});

			});
		}

	}
	//取0~7随机整数   公式：Math.floor(Math.random()*(max-min+1)+min);
	// setInterval(function () {
	// 	console.log(Math.floor(Math.random()*(7-0+1)+0));
	// }, 1000);
});