$(function () {
	$('#loading').animate({
		left: "1000px"
	},1350);
	var num = parseInt($('#num').html());
	
	// console.log(num);
	var timer = window.setInterval(function () {
		
		if (num < 100) {
			num = num + 1;
			$('#num').html(num);
		}else{
			clearInterval(timer);
			window.location.href = "html/index.html";	
		}

	},7);
	$('#loadbar').removeClass('ins').delay(16).queue(function(next){
		$(this).addClass('ins');
		next();
	});
	
});