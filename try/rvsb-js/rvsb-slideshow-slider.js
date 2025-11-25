(function($) {
  "use strict";
  UIkit.on('domready.uk.dom', function() {
    //Change slideshow on focuschange of slider
	  var slider = [];
	  var slideshow = [];
	  var pabIndex = 0;
	  var sderPerp={};
	  var sshowPerp={};
	  $('.wys-photoalbum').each(function(){
		  $(this).attr('index',pabIndex);
		  $(this).find('.autoplay').attr('index',pabIndex);
		  var sder = $(this).find('.slider');
		  var sshow = $(this).find('.slideshow');
		  if (sder.attr('data-uk-slider')) {
			  //alert(UIkit.Utils.options)
			  sderPerp = UIkit.Utils.options(sder.attr('data-uk-slider'));
			 
	  	  } else {
	  		sderPerp = {};
	  	  }
	  	  
		  if (sshow.attr('data-uk-slideshow')) {
			  sshowPerp = UIkit.Utils.options(sder.attr('data-uk-slideshow'));
		  } else {
			  sshowPerp = {};
		  }
		  sderPerp['center'] = true;
		  sderPerp['threshold'] = false;
		  slider[pabIndex] = UIkit.slider(sder,sderPerp);
		  slideshow[pabIndex] = UIkit.slideshow(sshow,sshowPerp);
		 
		  sder.on('focusitem.uk.slider', function(event, index, item, slider) {
			  //alert($(this).parent().index())
			  var thIndex = $(this).parent().attr('index');
			  slideshow[thIndex].show($(item).data('ukSlideshowItem'));
	      });
		  sshow.on('show.uk.slideshow', function(event, index) {
		    	var thIndex = $(this).parent().attr('index');
		    	var inn = $(this).find("li[aria-hidden='false']").index();
		    	var beforeActive = slider[thIndex].element.find('.uk-active').attr('data-uk-slideshow-item');
		    	if (inn > beforeActive) {
		    		setTimeout(function(){
		    			slider[thIndex].updateFocus(inn,1);    			
		    		},50)
		    	} else if(inn < beforeActive) {
		    		setTimeout(function(){
		    			slider[thIndex].updateFocus(inn,-1);    			
		    		},50)
		    	}
		  });
		  pabIndex++;
	  })
  });
}(jQuery));
i=0;
UIkit.on('init.uk.component', function(e, name, component) {
  if (name === 'slideshow') {
	  $('.wys-photoalbum').eq(i).find(".autoplay").on('change.uk.button', function(e, active) {
    	//slideshow[0].start();
      component[(active ? 'start' : 'stop')]();
    });
    i++;
  }
 
});
