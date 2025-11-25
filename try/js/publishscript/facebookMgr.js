/* uikit publish script */


jQuery(document).ready(function(){
	//facebook
	jQuery('img.imgFacebookLike').each(function(){
		//remove title 
		jQuery(this).next().remove();
		
		 var getHref = window.location.href;
		 var getDataLayout = jQuery(this).attr('cmdDataLayout');
		 var getDataAction = jQuery(this).attr('cmdDataAction');
		 var getDataShowFace = jQuery(this).attr('cmdDataShowFace');
		 var getDataShare = jQuery(this).attr('cmdDataShare');
		 var getDataWidth = jQuery(this).attr('cmdDataWidth');
		 
		 jQuery(this).after('<div class="fb-like" data-href="'+getHref+'" data-width="'+getDataWidth+'" data-layout="'+getDataLayout+'" data-action="'+getDataAction+'" data-show-faces="'+getDataShowFace+'" data-share="'+getDataShare+'"></div>');
		 jQuery(this).remove();
		 
	});
	
	jQuery('img.imgFacebookComment').each(function(){
		//remove title 
		jQuery(this).next().remove();
		
		 var getHref = jQuery(this).attr('cmdHref');
		 var getNumpost = jQuery(this).attr('cmdNumpost');
		 var getWidth = jQuery(this).attr('cmdWidth');
		 
		 var dataHref = (getHref.length == '0') ? 'data-href=""' : 'data-href="'+getHref+'"';
		 
		 jQuery(this).after('<div class="fb-comments" '+dataHref+' data-numposts="'+getNumpost+'" data-width="'+getWidth+'"></div>');
		 jQuery(this).remove();
		
	});
	
	jQuery('img.imgFacebookPage').each(function(){
		//remove title 
		jQuery(this).next().remove();
		 
		 var getHref = jQuery(this).attr('cmdHref');
		 var getWidth = jQuery(this).attr('cmdWidth');
		 var getHeight = jQuery(this).attr('cmdHeight');
		 var getSmallHeader = jQuery(this).attr('cmdSmallHeader');
		 var getAdaptContainerWidth = jQuery(this).attr('cmdAdaptContainerWidth');
		 var getHidCover = jQuery(this).attr('cmdHidCover');
		 var getShowFaceFri = jQuery(this).attr('cmdShowFaceFri');
		 var getTabs = jQuery(this).attr('cmdTabs');
		 
		 jQuery(this).after('<div class="fb-page" data-href="'+getHref+'" data-width="'+getWidth+'" data-height="'+getHeight+'" data-small-header="'+getSmallHeader+'" data-adapt-container-width="'+getAdaptContainerWidth+'" data-hide-cover="'+getHidCover+'" data-show-facepile="'+getShowFaceFri+'" data-tabs="'+getTabs+'"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/facebook"><a href="https://www.facebook.com/facebook">Facebook</a></blockquote></div></div>');
		 jQuery(this).remove();
		 
	});
	(function(d, s, id) {
		 var js, fjs = d.getElementsByTagName(s)[0];
		 if (d.getElementById(id)) return;
		 js = d.createElement(s); js.id = id;
		 js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=362039017157260";
		 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

	
});
