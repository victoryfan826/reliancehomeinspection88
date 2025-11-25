/* uikit publish script */

jQuery(document).ready(function(){
	jQuery('#divgooglemapFooter').hide();
	var divSelectedFooter = jQuery('div#selected_footer');
	console.log('ready() js/publishscript/footerMgr.js');
	//remove inline style footer
	//divSelectedFooter.find('*').removeAttr('style');
	//clear google map (แล้วสร้างใหม่)
	divSelectedFooter.find('div#google_maps_footer').empty();
	//clear site map (แล้วสร้างใหม่ตาม navigation)
	divSelectedFooter.find('div#sitemapFooter').empty();
	
	//build google maps
	var divGooglemapFooter = divSelectedFooter.find('div#google_maps_footer');
	var getLatGoogleMapFooter = divGooglemapFooter.attr('cmdlat');
	var getLongGoogleMapFooter = divGooglemapFooter.attr('cmdlong');
	var infoWindow = 'Company Name';
	console.log('getLatGoogleMapFooter == '+getLatGoogleMapFooter);
	console.log('getLongGoogleMapFooter == '+getLongGoogleMapFooter);
	if(getLatGoogleMapFooter != undefined && getLongGoogleMapFooter != undefined){
		googleMapsOnFooter(getLatGoogleMapFooter,getLongGoogleMapFooter,infoWindow);
	}
	
	//build sitemap
	var navigetionElement = jQuery('ul.uk-navbar-nav > li');
	navigetionElement.each(function(){
		var getLink = jQuery(this).find('a').first();
		var getHref = getLink.attr('href');
		var getText = getLink.find('span').text();
		var pageId = jQuery(this).find('span').attr('pageid');
				
		//display menu case: is not draft page
		if (jQuery(this).find('span').attr('is_draft') != '1') {
			
			//case: have subpage add +
			//1.ทำงานตอนโหลด wys ครั้งแรก plugins/PageSetting/core/init.js listPageNavigation()
			//2.ทำงานตอน click preview
			if(jQuery(this).closest('li').hasClass('uk-parent')){
				var res = getText.match(/\+/gi);
				if (!res) {
					getText = getText + '+';
				}
			}
			
			jQuery('div#selected_footer').find('div#sitemapFooter').append('<a href="'+ getHref +'" class="sitemapFooterLink" >'+getText+'</a><span> |<span> ');
		}

		//set hide footer
		//RVwys.frameBody.find('#sitemapFooter').find('span[pageid='+pageId+']').attr('is_draft', '1').hide();
	});
	
	divSelectedFooter.find('a.sitemapFooterLink').last().next().remove();
	
	//build socail url
	var urlFacebook = divSelectedFooter.find('a.uk-icon-facebook').attr('cmdhref');
	var urlTwitter = divSelectedFooter.find('a.uk-icon-twitter').attr('cmdhref');
	var urlGoogle = divSelectedFooter.find('a.uk-icon-google-plus').attr('cmdhref');
	var urlInstragrame = divSelectedFooter.find('a.uk-icon-instagram').attr('cmdhref');
	
	
	divSelectedFooter.find('a.uk-icon-facebook').attr('href',urlFacebook);
	divSelectedFooter.find('a.uk-icon-twitter').attr('href',urlTwitter);
	divSelectedFooter.find('a.uk-icon-google-plus').attr('href',urlGoogle);
	divSelectedFooter.find('a.uk-icon-instagram').attr('href',urlInstragrame);
	
	//if not set href social display none
	if(!urlFacebook){
		divSelectedFooter.find('a.uk-icon-facebook').hide();
	}
	
	if(!urlTwitter){
		divSelectedFooter.find('a.uk-icon-twitter').hide();
	}
	
	if(!urlGoogle){
		divSelectedFooter.find('a.uk-icon-google-plus').hide();
	}
	
	if(!urlInstragrame){
		divSelectedFooter.find('a.uk-icon-instagram').hide();
	}
	
	//build mailto
	if(divSelectedFooter.find('span#emailContactFooter').attr('cmdmailto') == 'on' && !parent.RVwys){
		var getColorEmail = divSelectedFooter.find('span#emailContactFooter').css('color');
		var getEmail = divSelectedFooter.find('span#emailContactFooter').html();
		var mailTo = '<a href="mailto:'+getEmail+'" style="color:'+getColorEmail+'">'+getEmail+'</a>';
		divSelectedFooter.find('span#emailContactFooter').html(mailTo);
	}
	
	//set year copyright
	/*var getCopryright = divSelectedFooter.find('#copyrightFooter').html(), 
	getYear = new Date(), 
	pattYear = /(\d{4})/;
	
	if(getCopryright){
		var replaceNowYear = getCopryright.replace(pattYear, getYear.getFullYear());
		
		divSelectedFooter.find('#copyrightFooter').html(replaceNowYear);
	}*/
	
	//set font family footer sitemap from parent
	divSelectedFooter.find('#sitemapFooter').find('a').css('font-family', divSelectedFooter.find('#sitemapFooter').css('font-family'));
});


//googleMap Footer
function googleMapsOnFooter(latCoordinates,longCoordinates,infoEdit){
	function initialize() {
	  var myLatlng = new google.maps.LatLng(latCoordinates,longCoordinates);
	  var mapOptions = {
	    zoom: 17,
	    center: myLatlng,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	 
	  var map = new google.maps.Map(document.getElementById('google_maps_footer'), mapOptions);

	  var contentString = infoEdit;

	  var infowindow = new google.maps.InfoWindow({
	      content: contentString
	  });

	  var marker = new google.maps.Marker({
	      position: myLatlng,
	      map: map,
	      animation: google.maps.Animation.DROP,
	      title: contentString
	  });
	  google.maps.event.addListener(marker, 'click', function() {
	    //infowindow.open(map,marker);
	  });
	  //infowindow.open(map,marker);
	}
    //javascript error 
	//google.maps.event.addDomListener(window, 'load', initialize());
}