$(window).scroll(function () {
	var wScroll= $(this).scrollTop();
	console.log(wScroll);
	$(".lirio").css({
		'transform' : 'translate(0px, '+ wScroll/2 +'%)'
	});
})