// build breadcrum

jQuery(document).ready(function(){
	buildePathway();
});

function buildePathway(){
	console.log('ready() buildePathway() --> js/publishscript/breadcrumMgr.js');
	var pathwaySelector = jQuery('div#selected_pathway'),
	getActivePathway = pathwaySelector.find('table').find('td').last().prev().html(),
	getActivePageId = pathwaySelector.find('table').find('td').last().prev().find('b').attr('pageid'),
	checkCompoDB = pathwaySelector.find('table').attr('iscomponentdb'),
	arrPageName = [];
		
	if(checkCompoDB == '1'){
		var getHtmlLoginRegister = jQuery('div#rvs_login_block').html();
		pathwaySelector.prepend('<div class="uk-container uk-container-center breadcrumbUikit"><div class="bgContent"><div class="uk-container uk-container-center"><div class="uk-grid uk-grid-small" data-uk-grid-margin=""><div class="uk-width-small-1-2"><ul class="uk-breadcrumb"></ul></div><div class="uk-width-small-1-2">'+getHtmlLoginRegister+'</div></div></div></div></div>');
		pathwaySelector.find('table').find('td').has('a').each(function(){
			pathwaySelector.find('ul.uk-breadcrumb').append('<li>'+jQuery(this).html()+'</li>');
		});

		if(pathwaySelector.find('table').find('td').length > 2){
			//console.log(pathwaySelector.find('table').find('td').last().prev().attr('pageid'));
			//debugger;
			pathwaySelector.find('ul.uk-breadcrumb').append('<li class="uk-active"><span>'+getActivePathway+'</span></li>');
		}

	}else{
		pathwaySelector.prepend('<div class="uk-container uk-container-center breadcrumbUikit"><div class="bgContent"><div class="uk-container uk-container-center"><ul class="uk-breadcrumb"></ul></div></div></div>');
		
		pathwaySelector.find('table').find('td').has('a').each(function(){
			
			//detect pathway repeat
			if(arrPageName.indexOf(jQuery(this).find('a').html()) < 0){
				pathwaySelector.find('ul.uk-breadcrumb').append('<li>'+jQuery(this).html()+'</li>');
			}
			arrPageName.push(jQuery(this).find('a').html());
		});

		if(pathwaySelector.find('table').find('td').length > 2){
			pathwaySelector.find('ul.uk-breadcrumb').append('<li class="uk-active"><span class="breadcrumb" "pageid="'+getActivePageId+'">'+getActivePathway+'</span></li>');
		}
	}

	//check breadcrumb ถ้าปิดอยู่ให้ปิดทั้ง div#selected_pathway
	if(!$('.uk-breadcrumb > li').length){ 
		$('div#selected_pathway').hide();
	}

	pathwaySelector.find('b').contents().unwrap();
	pathwaySelector.find('table').remove();
	
	//remove &nbsp; in li breadcrumb
	pathwaySelector.find('li').each(function(){
		var thisLi = $(this);
		thisLi.html(thisLi.html().replace(/&nbsp;/g, '')); 
	});
	
	//set fullwidth,fixedwidth breadcrumb and content
	var getWidthTypeHeader = jQuery('div#selected_headerbanner').find('div.uk-container-center').first().hasClass('rv-block-full');
	if(getWidthTypeHeader){
		jQuery('div#selected_pathway').find('div.uk-container-center').first().addClass('rv-block-full');

	}
	
	if($('.uk-breadcrumb').find('li').length == '1'){
		$('.uk-breadcrumb').find('li a').css('color', 'black');
	}
	
	//remove breadcrumb if repeat
	if(pathwaySelector.children('.breadcrumbUikit').length > 1){
		pathwaySelector.children('.breadcrumbUikit').first().remove();
	}
	
	//show bread crumb
	pathwaySelector.show();
	
	

	
}


