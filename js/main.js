
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
    }
}, 10);
var petals = $('#flower').children('a');
console.log(petals);
petals.each(function () {
		$(this).hover(
		function() {
			$("#site-title").stop(true, true).fadeOut();
			$("#site-title").text(this.id);
			$("#site-title").fadeIn(200);
		}, 
		function() {
			$("#site-title").stop(true, true).fadeOut();
			$("#site-title").text("MEREDITH HOO");
			$("#site-title").fadeIn(200);
		})
});

/*
Adding Animation
var rotation = 0;

jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

$('.rotate').click(function() {
    rotation += 5;
    $(this).rotate(rotation);
});
*/