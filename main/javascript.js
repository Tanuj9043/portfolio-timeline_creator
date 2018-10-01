$(document).ready(function(){
	$('#obtn').click(function(){
		$('#cb1').slideUp( 300, function() {
    		// Animation complete.
  		});
  		$('#cb2	').slideDown( 300, function() {
    		// Animation complete.
  		});
	});
	$('#cbtn').click(function(){
		$('#cb1').slideDown( 300, function() {
    		// Animation complete.
  		});
  		$('#cb2	').slideUp( 300, function() {
    		// Animation complete.
  		});
	});
});

function scrollto(id) {
	$('html, body').stop().animate({
        scrollTop: $('#'+id).offset().top-25
    }, 500);
}