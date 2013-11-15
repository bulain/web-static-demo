google.maps.visualRefresh = true;
function initialize() {
  var mapOptions = {
    center : new google.maps.LatLng(52.51, 13.4),
    zoom : 10,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };
  var mapContainer = document.getElementById("mapContainer");
  var map = new google.maps.Map(mapContainer, mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);