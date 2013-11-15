nokia.Settings.set("app_id", "");
nokia.Settings.set("app_code", "");
var mapContainer = document.getElementById("mapContainer");
var map = new nokia.maps.map.Display(mapContainer, {
  zoomLevel : 10,
  center : [52.51, 13.4],
  components : [
  // "Behavior",
  // "zoom.MouseWheel", "zoom.DoubleClick", "zoom.DoubleTap", "zoom.Gesture",
  // "zoom.GestureEvent", "zoom.panorama.MouseWheel",
  // "panning.Drag", "panning.Kinetic", "panning.panorama.Click",
  // "objects.DragMarker"

  new nokia.maps.map.component.zoom.MouseWheel(), 
  new nokia.maps.map.component.zoom.DoubleClick(),
  new nokia.maps.map.component.panning.Drag(),

  // new nokia.maps.map.component.zoom.DoubleTap(),
  // new nokia.maps.map.component.zoom.Gesture(),
  // new nokia.maps.map.component.panning.Kinetic(),
  // new nokia.maps.map.component.objects.DragMarker()

  // new nokia.maps.map.component.ZoomBar(),
  // new nokia.maps.map.component.Behavior(),
  // new nokia.maps.map.component.TypeSelector(),
  // new nokia.maps.map.component.Traffic(),
  // new nokia.maps.map.component.PublicTransport(),
  // new nokia.maps.map.component.DistanceMeasurement(),
  // new nokia.maps.map.component.Overview(),
  // new nokia.maps.map.component.ScaleBar(),
  // new nokia.maps.positioning.component.Positioning(),
  // new nokia.maps.map.component.ContextMenu(),
  // new nokia.maps.map.component.ZoomRectangle(),
  // new nokia.maps.map.component.TrafficIncidents()
  ]
});

map.addListener("displayready", function() {
  console.log('displayready...');

  var components = map.components;
  var array = components.asArray();
  var ids = array.map(function(c) {
    return c.getId();
  });
  console.log(ids);

  var drag = map.getComponentById("panning.Drag");
  drag.set("enabled", false);
  console.log(drag.enabled);

}, false);

map.addListener("mapviewchangeend", function() {
  console.log('mapviewchangeend...');
}, false);

var listener = function(name, e) {
  console.log(name);
};

map.addListeners({
  "mousedown" : [listener.bind(this, "mousedown")],
  "mousemove" : [listener.bind(this, "mousemove")],
  "mouseup" : [listener.bind(this, "mouseup")],
  "mousewheel" : [listener.bind(this, "mousewheel")],
  "dragstart" : [listener.bind(this, "dragstart")],
  "drag" : [listener.bind(this, "drag")],
  "dragend" : [listener.bind(this, "dragend")],
});