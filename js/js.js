(function() {

	var COLOR = ['#FF0000', '#00FF00', '#0000FF'];
	var brasil = { x: -15.7797200, y: -47.9297200 };
	var map = null;

	function drawLines() {
		var coords;
		for (var j = 0 ; j < geometries.length ; j++) {
			poli = geometries[j];
			for (var k = 0 ; k < poli.length ; k++) {
				var coords = poli[k];
				var coordinates = [];
				for (var i = 0 ; i < coords.length ; i++ ) {
					var point = new google.maps.LatLng(coords[i + 1], coords[i]);
					i+=1;
					coordinates.push(point);
				}
				var path = new google.maps.Polyline({
					path: coordinates,
					geodesic: true,
					strokeColor: COLOR[j%3],
					strokeOpacity: 1.0,
					strokeWeight: 2
				});
				path.setMap(map);
			}
		}
	}

	function getCurrentPosition_Success(location) {
		if (map != null) {
			var ponto = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
			var marker = new google.maps.Marker({ position: ponto, map: map });
			map.panTo(ponto);
		}
	}

	function getCurrentPosition_Error(error) {
		if (document.location.origin != "file://") {
			alert("Error - " + error.code + " - " + error.message);
		}
	}

	function start() {
		var options = { enableHighAccuracy: true };
		var mapProp = {
			center: new google.maps.LatLng(geometries[0][0][1], geometries[0][0][0]), zoom: 10, mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var divMap = document.getElementById("map");
		map = new google.maps.Map(divMap, mapProp);
		// var marker = new google.maps.Marker({ position: mapProp.center, map: map });
		navigator.geolocation.getCurrentPosition(getCurrentPosition_Success, getCurrentPosition_Error, options);
		drawLines();
	}

	window.addEventListener('load', start, false);

})();
