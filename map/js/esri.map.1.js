require(["esri/map"], function(Map) {
  var map = new Map("mapContainer", {
    basemap : "topo",
    center : [13.4, 52.51],
    zoom : 10
  });
});