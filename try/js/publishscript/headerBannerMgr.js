/* uikit publish script */
$(function() {
	jQuery(document).ready(function(){
		/*
		if($('.uk-slideshow').prop('tagName') == 'UL'){
			$('.uk-slideshow').hide();
			$('.uk-slideshow').css("height", "520px");
			$('.uk-slideshow').find("li").css("height", "520px");
			setTimeout(function(){
				$('.uk-slideshow').css("height", "520px");
				$('.uk-slideshow').find("li").css("height", "520px");
				$('.uk-slideshow').show();
			}, 1000);			
		}
		*/
		
		//set z-index logo, companyname, slogan
		$('#Layer1').css('z-index', '11');
		$('#Layer2').css('z-index', '12');
		$('#Layer3').css('z-index', '13');
	});
});