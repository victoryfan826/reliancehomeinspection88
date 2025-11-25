// rebuild iframe placeholder to video

jQuery(document).ready(function(){
	
	 // Load the IFrame Youtube Player API code asynchronously.
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/player_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
	//list youtube element
	$('.video_youtube').each(function(){
		console.log(this.children[0].getAttribute('autoplay'));
		var checkAutoPlay = this.children[0].getAttribute('autoplay');
		var getYotubeIframeElem = $(this).children('.iframeYoutube');
		
		//ลบ style ที่ใส่ค่าไว้เพื่อไม่ให้คลิกแล้วเกิด event ต่างๆใน wys
		getYotubeIframeElem.removeAttr('style');

		//build new iframe if autoplay
		if(checkAutoPlay === 'true'){
			setTimeout(function(){
				getYotubeIframeElem.attr('src', getYotubeIframeElem.attr('src')+'&autoplay=1');
			}, 3000);
		}
		
	});

});