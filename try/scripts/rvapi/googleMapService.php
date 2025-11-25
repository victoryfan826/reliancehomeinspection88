<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<meta charset="utf-8">
<title>Info windows</title>
<style>
html,body,#map-canvas {
 height: 100%;
 margin: 0px;
 padding: 0px
}

#panel {
 position: absolute;
 top: 5px;
 left: 50%;
 margin-left: -180px;
 z-index: 5;
 background-color: #fff;
 padding: 5px;
 border: 1px solid #999;
}
</style>
<script src="/ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
</head>

<body>
 <div id="map-canvas"></div>
 <div id="panel">
  <button id="buttonDirectionMobile" onclick="calcRouteMobile();">Get Direction</button>
  <button id="buttonDirectionDesktop" onclick="calcRouteDesktop();">Get Direction</button>
  from:
  <input type='text' id='address'>
 </div>
</body>
<script>
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var isMobile = {
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function() {
	        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	    }
};
if(isMobile.any()) {
	  $(document).ready(function(){
		  $('button#buttonDirectionDesktop,input#address').hide();
	  });

}else{
	  $(document).ready(function(){
		  $('button#buttonDirectionMobile').hide();
	  });
}

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();

  var contentEncode = '<? echo $_GET['infoWindows']; ?>';
  var maptypeEncode = '<? echo $_GET['mapType']; ?>';
  var coordinatesLat = '<? echo $_GET['coordinatesLat']; ?>';
  var coordinatesLng = '<? echo $_GET['coordinatesLng']; ?>';

  maptypeEncode = Base64.decode(maptypeEncode);
  maptypeEncode = getChooseTypeMaps(maptypeEncode);

  var myLatlng = new google.maps.LatLng(coordinatesLat,coordinatesLng);
  var mapOptions = {
    zoom: 17,
    center: myLatlng,
    mapTypeId: maptypeEncode
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);

  var infowindow = new google.maps.InfoWindow({
      content: Base64.decode(contentEncode)
  });

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
  infowindow.open(map,marker);
}

google.maps.event.addDomListener(window, 'load', initialize);

function getChooseTypeMaps(mapType){
	var returnMapType;
	switch(mapType) {
    		case "roadmap":
       			returnMapType = google.maps.MapTypeId.ROADMAP;
        		break;
    		case "terrain":
        		returnMapType = google.maps.MapTypeId.TERRAIN;
        		break;
    		case "satellite":
        		returnMapType = google.maps.MapTypeId.SATELLITE;
        		break;
        	case "hybrid":
        		returnMapType = google.maps.MapTypeId.HYBRID;
        		break;
    		default:
        		returnMapType = google.maps.MapTypeId.ROADMAP;
        		break;
	}
	return returnMapType;
}

function calcRouteMobile() {
	 var endLat;
	 var endLng;
	 if(navigator.geolocation){
		 	 navigator.geolocation.getCurrentPosition(function(position) {
		 		endLat = position.coords.latitude;
		 		endLng = position.coords.longitude;
		 		makeDirectionMobile(endLat,endLng);

		 		console.log(TestGlobal());
		 		console.log(endLng);
			 });

	}else{
		alert('Browser doesn\'t support Geolocation');
		return false;
	}

	function makeDirectionMobile(endLat,endLng){
		var coordinatesLat = '<? echo $_GET['coordinatesLat']; ?>';
		var coordinatesLng = '<? echo $_GET['coordinatesLng']; ?>';

		var start = new google.maps.LatLng(endLat,endLng);
		var end = new google.maps.LatLng(coordinatesEncode[0],coordinatesEncode[1]);
		var request = {
				origin:start,
				destination:end,
				travelMode: google.maps.TravelMode.DRIVING
	  	};
	  	directionsService.route(request, function(response, status) {
		  	if (status == google.maps.DirectionsStatus.OK) {
		  		directionsDisplay.setDirections(response);
			}
	  	});
	}
}

function calcRouteDesktop() {

	var getAddress = $('input#address').val();
	
	var Url = '';
	//ยกเลิก return false;
	return false;
	$.getJSON(Url, function(oBject){
		if(oBject.status == 'OK'){
            var getCoordinates = oBject.results[0].geometry.location;

			makeDirectionDesktop(getCoordinates.lat,getCoordinates.lng);
		}else{
			alert('Your direction is not correct');
			return false;
		}
	});

	function makeDirectionDesktop(endLat,endLng){
		var coordinatesLat = '<? echo $_GET['coordinatesLat']; ?>';
		var coordinatesLng = '<? echo $_GET['coordinatesLng']; ?>';

		var start = new google.maps.LatLng(endLat,endLng);
		var end = new google.maps.LatLng(coordinatesLat,coordinatesLng);
		var request = {
				origin:start,
				destination:end,
				travelMode: google.maps.TravelMode.DRIVING
	  	};
	  	directionsService.route(request, function(response, status) {
		  	if (status == google.maps.DirectionsStatus.OK) {
		  		directionsDisplay.setDirections(response);
			}
	  	});
	}
}
</script>

</html>
