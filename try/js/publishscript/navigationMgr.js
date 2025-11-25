/* uikit publish script */
$(function() {
	
jQuery(document).ready(function(){
	console.log('ready() --> js/publishscript/navigationMgr.js');
	
	var divSelectedFooter = jQuery('div#selected_footer');
	var getTime = new Date().getMilliseconds();
	//check is object in EditorMode
	if (typeof RVwys == 'object' && RVwys.plugin['EditorMode']) {
		//console.log('EditorMode:' + RVwys.plugin['EditorMode']);
		var isPreviewPublish = '0';
	} else {
		//ทำเฉพาะ preview/publish
		var isPreviewPublish = '1';
	}
	
	if(isPreviewPublish == '1'){
		var getUrl = location.host + location.pathname;
		console.log('getUrl: ' + getUrl);
		var isExtension = /\.php$|\.html$/gi;
		var regex = new RegExp(isExtension);
		var haveFileExtension = (getUrl.match(regex)) ? '1' : '0';
		console.log('haveFileExtension: ' + haveFileExtension);
		
		//case: desktop class="uk-navbar-nav"
		//loop set active
		jQuery(".uk-navbar-nav a").each(function () {
			var getHref = jQuery(this).attr('href');
			getHref = getHref.replace(/^(https|http)?\:\/\//i, "");
			var subHref = getUrl.substring(0, getHref.length);
			var getIsHome = jQuery(this).children().closest('span').attr('is_homepage');

			//console.log('getHref====' + getHref);
			//console.log('subHref===' + subHref);
			if (getUrl.substring(0, getHref.length) === getHref) {
				console.log('set active getHref == ' + getHref);
				//lv0
				jQuery(this).closest('li').addClass('uk-active');
				//parent have lv1
				jQuery(this).closest('li').parent().closest('li').addClass('uk-active');
				//parent have lv2
				jQuery(this).closest('li').parent().closest('li').parent().closest('li').addClass('uk-active');
			}

			//case: not have file extension set active to homepage
			if (haveFileExtension == '0' && getIsHome == '1') {
				console.log('set active getIsHome == ' + getIsHome);
				//lv0
				jQuery(this).closest('li').addClass('uk-active');
				//parent have lv1
				jQuery(this).closest('li').parent().closest('li').addClass('uk-active');
				//parent have lv2
				jQuery(this).closest('li').parent().closest('li').parent().closest('li').addClass('uk-active');
			}
		});
		
		//case: mobile class="uk-nav-offcanvas"
		jQuery(".uk-nav-offcanvas a").each(function () {
			var getHref = jQuery(this).attr('href');
			getHref = getHref.replace(/^(https|http)?\:\/\//i, "");
			var subHref = getUrl.substring(0, getHref.length);
			var getIsHome = jQuery(this).children().closest('span').attr('is_homepage');

			//console.log('getHref====' + getHref);
			//console.log('subHref===' + subHref);
			if (getUrl.substring(0, getHref.length) === getHref) {
				console.log('set active getHref == ' + getHref);
				//lv0
				jQuery(this).closest('li').addClass('uk-active');
				//parent have lv1
				jQuery(this).closest('li').parent().closest('li').addClass('uk-active');
				//parent have lv2
				jQuery(this).closest('li').parent().closest('li').parent().closest('li').addClass('uk-active');
			}

			//case: not have file extension set active to homepage
			if (haveFileExtension == '0' && getIsHome == '1') {
				console.log('set active getIsHome == ' + getIsHome);
				//lv0
				jQuery(this).closest('li').addClass('uk-active');
				//parent have lv1
				jQuery(this).closest('li').parent().closest('li').addClass('uk-active');
				//parent have lv2
				jQuery(this).closest('li').parent().closest('li').parent().closest('li').addClass('uk-active');
			}
			
		});
				
		//on click set current page
		jQuery("ul.uk-navbar-nav li a").click(function(e) {
			jQuery('ul.uk-navbar-nav').find('.uk-navbar-nav').find(".uk-active").removeClass("uk-active");
			console.log('click add uk-active');
			jQuery(this).addClass("uk-active");
		});
	}

	//set align
	if(jQuery('div#getDetailNavigator').attr('cmdalign') == 'uk-navbar-center'){
		if(!jQuery('#rvnav-center').attr('id')){
			jQuery('ul.uk-navbar-nav').wrap("<div id='rvnav-center'></div>");
		}
	}else{
		jQuery('ul.uk-navbar-nav').addClass(divSelectedFooter.find('div#getDetailNavigator').attr('cmdalign'));
	}
	jQuery('ul.uk-navbar-nav').find('ul.uk-nav-navbar').addClass('rv-text-left');
	
	console.log('=== isPreviewPublish ' + isPreviewPublish);
	console.log('=== cmdhiddennav ' + jQuery('div#getDetailNavigator').attr('cmdhiddennav'));
	
	//nav hidden
	if(isPreviewPublish == '1' && jQuery('div#getDetailNavigator').attr('cmdhiddennav') == 'hide'){
		//hide navigation
		jQuery('div#rvnavigator').css('display','none');
		//hide mobile
		jQuery('div#selected_headerblock').css('display','none');
	}
	
	//nav sub hidden
	if(isPreviewPublish == '1' && jQuery('div#getDetailNavigator').attr('cmdhiddensubmenu') == 'hide'){
		jQuery('div#rvnavigator').find('div.uk-dropdown-navbar').remove();
	}

	//remove inline style
	var navSelector = jQuery('div#selected_navigator');
	setTimeout(function(){
		navSelector.find('nav.uk-navbar').removeAttr('style');
		//fix width ให้เท่ากับ header banner
		var getWidthHeader = (parseInt(jQuery('#rvs-uk-slide').css('width'))) ? jQuery('#rvs-uk-slide').css('width') : jQuery('#selected_headerbanner').find('.uk-container').first().css('width');
		jQuery('nav.uk-navbar').css('width', getWidthHeader);
	},2000);
	
	//remove uk-sticky-placeholder (มันทับกับ css slide)
    setTimeout(function(){
		navSelector.find('div.uk-sticky-placeholder').removeClass('uk-sticky-placeholder');
	},1000);
    
    //remove height ใต้ #rvnavigator
    navSelector.find('#rvnavigator').children().first().css('height','0px');

	//add sticky option
    if(!parent.RVwys){
    	var positionSticky = '-600';
    }else{
    	var getPreviewWys = parent.$('body').find('div#fEffLoad').prop('tagName');
    	if(getPreviewWys == 'DIV'){
    		var positionSticky = '-600';
    	}else{
    		var positionSticky = '-1000000';
    	}
    }	
    
	setTimeout(function(){
		rvSticky = UIkit.sticky('.uk-navbar', {
			top : positionSticky,
			animation : 'uk-animation-slide-top',
			clsactive : 'uk-actives'
		});
	},50);
	
	//mobile click expand
	//*** remove href ของ a ใน li.uk-parent แล้ว save ลง attr cmdhref 
	var navMobileSelector = jQuery('div#selected_navigator-mobile');
	navMobileSelector.find('li.uk-parent').each(function(){
		var getUrl = jQuery(this).find('a').first().attr('href');
		jQuery(this).find('a').first().attr('cmdHref', getUrl);
		jQuery(this).find('a').first().attr('href','#');
		//remove + ออกจาก menu mobile
		jQuery(this).find('span').each(function(){
			var htmlCut = jQuery(this).html();
			htmlCut = htmlCut.replace('+','');
			jQuery(this).html(htmlCut);
		});
	});
	//*** click span แล้วคืน cmdhref ให้ href  
	navMobileSelector.find('li.uk-parent').each(function(){
		
		jQuery(this).find('a').first().find('span').click(function(){
			var getUrl = jQuery(this).parent().attr('cmdHref');
			jQuery(this).parent().attr('href', getUrl);
		});
		
	});
	
	//choose style navigation
	var getStyleNavigation = jQuery('div#getDetailNavigator').attr('cmdnavstyle');
	var getHrefStyleCssNavFile = jQuery('link[href*="rvsb-nav-style"]').attr('href');
	var pattGetHref = /.*rvsb-css\//g; 
	var resultGetHref = getHrefStyleCssNavFile.match(pattGetHref);
	
	switch(getStyleNavigation){
	case 'style1':
		jQuery('link[href*="rvsb-nav-style"]').attr('href', resultGetHref+'rvsb-nav-style-1.css?v='+MD5('Time'+getTime));
		break;
	case 'style2':
		jQuery('link[href*="rvsb-nav-style"]').attr('href', resultGetHref+'rvsb-nav-style-2.css?v='+MD5('Time'+getTime));
		break;
	case 'style3':
		jQuery('link[href*="rvsb-nav-style"]').attr('href', resultGetHref+'rvsb-nav-style-3.css?v='+MD5('Time'+getTime));
		break;
	case 'style4':
		jQuery('link[href*="rvsb-nav-style"]').attr('href', resultGetHref+'rvsb-nav-style-4.css?v='+MD5('Time'+getTime));
		break;
	case 'style5':
		jQuery('link[href*="rvsb-nav-style"]').attr('href', resultGetHref+'rvsb-nav-style-5.css?v='+MD5('Time'+getTime));
		break;
	default:
		jQuery('link[href*="rvsb-nav-style"]').attr('href', resultGetHref+'rvsb-nav-style-1.css?v='+MD5('Time'+getTime));
		break;
	}
	
	
	//set show/hide favicon on preview/publish
	var getFaviconShowHide = jQuery('div#getDetailNavigator').attr('cmdshowfavicon');
	var getUrl = location.host + location.pathname;
	getUrl = getUrl.substring(0, getUrl.lastIndexOf("/") + 1);
	console.log('getUrl: ' + getUrl);
	
	if(getFaviconShowHide == 'show'){
		jQuery('head').append('<link rel="shortcut icon" href="/'+getUrl+'/images/favicon.ico?v='+MD5('Time'+getTime)+'" />');
	}else{
		jQuery('head').append('<link rel="shortcut icon" href="/'+getUrl+'/images/spacer.gif?v='+MD5('Time'+getTime)+'" />');
	}
	
	//set uk-icon-caret-down สำหรับ nav ที่มี sub 
	jQuery('nav.uk-navbar').find('li.uk-parent').each(function(){
		var aParent = jQuery(this).find('a').first();
		var getHtmlSpan = aParent.find('span').html();
		var getHtmlSpanLength = getHtmlSpan.length;
		
		if(getHtmlSpan.charAt(getHtmlSpanLength - 1) == '+'){
			var replaceIconSubmenu = getHtmlSpan.replace('+', '<i class="uk-icon-caret-down"></i>');
			 aParent.find('span').html(replaceIconSubmenu);
		}
	});
	
	//set uk-icon-caret-right สำหรับ nav level 1 ที่มี sub 
	jQuery('nav.uk-navbar').find('ul.uk-nav-sub').each(function(){
		if(!$(this).prev().find('.uk-icon-caret-right').hasClass('uk-icon-caret-right')){
			$(this).prev().append('<i class="uk-icon-caret-right"></i>');
		}
	});
	
	jQuery('nav.uk-navbar').find('li.uk-parent').find('ul.uk-nav').find('li').has('ul.uk-nav-sub').each(function(){
		var aParent = jQuery(this).find('a').first();
		var getHtmlSpan = aParent.find('span').html();
		var getHtmlSpanLength = getHtmlSpan.length;
		
		if(getHtmlSpan.charAt(getHtmlSpanLength - 1) == '+'){
			var replaceIconSubmenu = getHtmlSpan.replace('+', '');
			 aParent.find('span').html(replaceIconSubmenu);
		}
	});
	
	//set full,fixed width nav ตาม header
	var getWidthTypeHeader = jQuery('div#selected_headerbanner').find('div.uk-container').first().hasClass('rv-block-full');
	if(getWidthTypeHeader){
		jQuery('div#selected_navigator').find('div.uk-container').first().addClass('rv-block-full');
	}
	
	$(document).on("click", 'nav.uk-active', function (e) {
		var getBodyClass = jQuery('html').css('margin-top');
		if(getBodyClass == '0px'){
			//console.log('0px');
		}else{
			//$('nav.uk-active').animate({marginLeft:'270px'},'fast');
		}
	});
	
	//submenu mobile on preview in wys
    if(parent.RVwys){
    	var getCloneMobileNav = $("[data-uk-nav]").clone();
    	if(getCloneMobileNav.hasClass("uk-nav")){
    		$("[data-uk-nav]").remove();
    		getCloneMobileNav.find(".uk-hidden").contents().unwrap();
    		$('div.uk-offcanvas-bar').append(getCloneMobileNav);
    	}
    }

});
});

var MD5 = function (string) {

	   function RotateLeft(lValue, iShiftBits) {
	           return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	   }

	   function AddUnsigned(lX,lY) {
	           var lX4,lY4,lX8,lY8,lResult;
	           lX8 = (lX & 0x80000000);
	           lY8 = (lY & 0x80000000);
	           lX4 = (lX & 0x40000000);
	           lY4 = (lY & 0x40000000);
	           lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
	           if (lX4 & lY4) {
	                   return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
	           }
	           if (lX4 | lY4) {
	                   if (lResult & 0x40000000) {
	                           return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
	                   } else {
	                           return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
	                   }
	           } else {
	                   return (lResult ^ lX8 ^ lY8);
	           }
	   }

	   function F(x,y,z) { return (x & y) | ((~x) & z); }
	   function G(x,y,z) { return (x & z) | (y & (~z)); }
	   function H(x,y,z) { return (x ^ y ^ z); }
	   function I(x,y,z) { return (y ^ (x | (~z))); }

	   function FF(a,b,c,d,x,s,ac) {
	           a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
	           return AddUnsigned(RotateLeft(a, s), b);
	   };

	   function GG(a,b,c,d,x,s,ac) {
	           a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
	           return AddUnsigned(RotateLeft(a, s), b);
	   };

	   function HH(a,b,c,d,x,s,ac) {
	           a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
	           return AddUnsigned(RotateLeft(a, s), b);
	   };

	   function II(a,b,c,d,x,s,ac) {
	           a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
	           return AddUnsigned(RotateLeft(a, s), b);
	   };

	   function ConvertToWordArray(string) {
	           var lWordCount;
	           var lMessageLength = string.length;
	           var lNumberOfWords_temp1=lMessageLength + 8;
	           var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
	           var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
	           var lWordArray=Array(lNumberOfWords-1);
	           var lBytePosition = 0;
	           var lByteCount = 0;
	           while ( lByteCount < lMessageLength ) {
	                   lWordCount = (lByteCount-(lByteCount % 4))/4;
	                   lBytePosition = (lByteCount % 4)*8;
	                   lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
	                   lByteCount++;
	           }
	           lWordCount = (lByteCount-(lByteCount % 4))/4;
	           lBytePosition = (lByteCount % 4)*8;
	           lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
	           lWordArray[lNumberOfWords-2] = lMessageLength<<3;
	           lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
	           return lWordArray;
	   };

	   function WordToHex(lValue) {
	           var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
	           for (lCount = 0;lCount<=3;lCount++) {
	                   lByte = (lValue>>>(lCount*8)) & 255;
	                   WordToHexValue_temp = "0" + lByte.toString(16);
	                   WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
	           }
	           return WordToHexValue;
	   };

	   function Utf8Encode(string) {
	           string = string.replace(/\r\n/g,"\n");
	           var utftext = "";

	           for (var n = 0; n < string.length; n++) {

	                   var c = string.charCodeAt(n);

	                   if (c < 128) {
	                           utftext += String.fromCharCode(c);
	                   }
	                   else if((c > 127) && (c < 2048)) {
	                           utftext += String.fromCharCode((c >> 6) | 192);
	                           utftext += String.fromCharCode((c & 63) | 128);
	                   }
	                   else {
	                           utftext += String.fromCharCode((c >> 12) | 224);
	                           utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	                           utftext += String.fromCharCode((c & 63) | 128);
	                   }

	           }

	           return utftext;
	   };

	   var x=Array();
	   var k,AA,BB,CC,DD,a,b,c,d;
	   var S11=7, S12=12, S13=17, S14=22;
	   var S21=5, S22=9 , S23=14, S24=20;
	   var S31=4, S32=11, S33=16, S34=23;
	   var S41=6, S42=10, S43=15, S44=21;

	   string = Utf8Encode(string);

	   x = ConvertToWordArray(string);

	   a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

	   for (k=0;k<x.length;k+=16) {
	           AA=a; BB=b; CC=c; DD=d;
	           a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
	           d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
	           c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
	           b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
	           a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
	           d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
	           c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
	           b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
	           a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
	           d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
	           c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
	           b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
	           a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
	           d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
	           c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
	           b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
	           a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
	           d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
	           c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
	           b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
	           a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
	           d=GG(d,a,b,c,x[k+10],S22,0x2441453);
	           c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
	           b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
	           a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
	           d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
	           c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
	           b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
	           a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
	           d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
	           c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
	           b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
	           a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
	           d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
	           c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
	           b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
	           a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
	           d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
	           c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
	           b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
	           a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
	           d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
	           c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
	           b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
	           a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
	           d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
	           c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
	           b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
	           a=II(a,b,c,d,x[k+0], S41,0xF4292244);
	           d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
	           c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
	           b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
	           a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
	           d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
	           c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
	           b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
	           a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
	           d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
	           c=II(c,d,a,b,x[k+6], S43,0xA3014314);
	           b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
	           a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
	           d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
	           c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
	           b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
	           a=AddUnsigned(a,AA);
	           b=AddUnsigned(b,BB);
	           c=AddUnsigned(c,CC);
	           d=AddUnsigned(d,DD);
	   		}

	   	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

	   	return temp.toLowerCase();
};

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if(scroll == 0){
		//fix width ให้เท่ากับ header banner
		var getWidthHeader = (parseInt(jQuery('#rvs-uk-slide').css('width'))) ? jQuery('#rvs-uk-slide').css('width') : jQuery('#selected_headerbanner').find('.uk-container').first().css('width');
		setTimeout(function(){
			jQuery('nav.uk-navbar').css('width', getWidthHeader);
		},500);
    }
});