$(document).bind('editorCompleted',function(){
		$('a').each(function(){
	    	if($(this).attr('datatitle')) {
	    		opt = JSON.parse(unescape($(this).attr('datatitle')));
	    		$(this).qtip(opt);
	    	}
	    	if($(this).attr('datapopup')) {
	    		opt = JSON.parse(unescape($(this).attr('datapopup')));
	    		$(this).colorbox(opt);
	    	}
	    });

		
});

$(document).ready(function() {
	$(document).trigger("editorCompleted");
});