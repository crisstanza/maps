(function() {

	var map = null;

	// http://www.farb-tabelle.de/en/table-of-color.htm
	var COLOR = [['#8B0000', '#EEA9B8'], ['#228B22', '#C1FFC1'], ['#0000FF', '#76EEC6']];
	var ICON = ['red', 'green', 'blue'];

	var brasil = { x: -15.7797200, y: -47.9297200 };

	function drawLines() {
		var coords;
		for (var m = 0 ; m < geometries.length ; m++) {
			if ( true || m == 0 || m == 1 || m == 2 ) {
				var geometry = geometries[m];
				for (var j = 0 ; j < geometry.length ; j++) {
					poli = geometry[j];
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
							strokeColor: COLOR[m%3][j%2],
							strokeOpacity: 0.75,
							strokeWeight: 3
						});
						path.setMap(map);
						if ( j == (geometry.length - 1)) {
							new google.maps.Marker({ position: coordinates[coordinates.length - 1], map: map, title: 'End ('+m+')', icon: new google.maps.MarkerImage('http://maps.google.com/mapfiles/ms/icons/' + ICON[m%3] + '.png') });
						}
					}
				}
			}
		}
	}

	function getCurrentPosition_Success(location) {
		if (map != null) {
			var ponto = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
			var marker = new google.maps.Marker({ position: ponto, map: map, title: 'Current location.' });
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
			center: new google.maps.LatLng(geometries[0][0][0][1], geometries[0][0][0][0]), zoom: 10, mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var divMap = document.getElementById("map");
		map = new google.maps.Map(divMap, mapProp);
		navigator.geolocation.getCurrentPosition(getCurrentPosition_Success, getCurrentPosition_Error, options);
		drawLines();
	}

	window.addEventListener('load', start, false);

})();
