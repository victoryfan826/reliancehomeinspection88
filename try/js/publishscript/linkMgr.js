// build link

jQuery(document).ready(function(){

	//build popups
	$('.isPopup').each(function(){
		$(this).attr('href', '#'+$(this).attr('modalid'));
		
		var modalHTML = '<div class="uk-modal" aria-hidden="true" style="overflow-y: scroll; display: none;">'+
                        '<div class="uk-modal-dialog" style="padding:0px;">'+
                        '<a href="" class="uk-modal-close uk-close" style="margin: 10px;"></a>'+
                        '<iframe src="" style=" width: 100%;height: 500px;">'+
                        '</iframe></div> </div>';
		$(this).after(modalHTML);
		
		$(this).next().attr('id', $(this).attr('modalid')).find('iframe').attr('src', $(this).attr('getHref'));
	});
	
	//build page internal
	$('.isInternalPage').each(function(){
		$(this).attr('href', $(this).attr('getHref'));
	});
	
	//build tooltips
	$('[tooltipholdertext]').each(function(){	
		$(this).attr({'title': $(this).attr('tooltipholdertext')});
	});
	
	//build bookmark
	$('.isGetBookmark').each(function(){
		var objBookmark = $(this).attr('getPosition');		
		if (objBookmark == '#topmost') {
			//case: click top set href เป็น #
			$(this).attr('href', '#');
			$(this).attr('getPosition', '#topmost');
		} else {
			$(this).attr('href', objBookmark);
		}
		
		if(!parent.RVwys){
			$(this).attr('data-uk-smooth-scroll', '');

			$(this).click(function () {
				
				if ($(this).attr('href') == '#') {
					$(this).attr('getPosition', '#topmost');
					console.log('goto Top');
					//goto Top
					return true;
				}
						
				console.log(objBookmark + ' offset().top: ' + $(objBookmark).offset().top);
				bMarkTop = $(objBookmark).offset().top
				if ($(objBookmark).offset().top > 600) {
					bMarkTop-=60;
				}    
				
				$('html, body').animate({
                    scrollTop: bMarkTop
                }, 400,function(){
                	root = bMarkTop;
                });
                return false;
            });
	    }
	});
	
	//build email, external website
	$('.isWebsite, .isEmail').each(function(){
		$(this).attr('href', $(this).attr('holdhref'));
	});
	
	// publishUrl
	var publishUrl = location.host + location.pathname;
	publishUrl = location.protocol + '//' + publishUrl.substring(0, publishUrl.lastIndexOf("/") + 1);
	console.log('publishUrl: ' + publishUrl);
	
	$('.isDownloadFile').each(function(){
		$(this).attr('href', publishUrl + "/documents/" + $(this).attr('gethref'));
	});
	
	
});