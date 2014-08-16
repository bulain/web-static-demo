var map = new BMap.Map("container");
var point = new BMap.Point(116.404, 39.915);
map.centerAndZoom(point, 15);
map.enableScrollWheelZoom();
map.enableContinuousZoom();
map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.OverviewMapControl());
map.addControl(new BMap.MapTypeControl());

var point = new BMap.Point(116.404, 39.915);
var marker = new BMap.Marker(point);
map.addOverlay(marker);
marker.setAnimation(BMAP_ANIMATION_BOUNCE);
marker.addEventListener("click", function() {
    alert("您点击了标注");
});
marker.enableDragging();
marker.addEventListener("dragend", function(e) {
    alert("当前位置：" + e.point.lng + ", " + e.point.lat);
})
function addMarker(point, index) {
    var myIcon = new BMap.Icon("../img/marker.png", new BMap.Size(256, 256), {
        imageSize : new BMap.Size(50, 50)
    });
    var marker = new BMap.Marker(point, {
        icon : myIcon
    });
    //var marker = new BMap.Marker(point);
    map.addOverlay(marker);
}

var bounds = map.getBounds();
var sw = bounds.getSouthWest();
var ne = bounds.getNorthEast();
var lngSpan = Math.abs(sw.lng - ne.lng);
var latSpan = Math.abs(ne.lat - sw.lat);
var markers = [];
for (var i = 0; i < 10; i++) {
    var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7 + 0.15), sw.lat + latSpan * (Math.random() * 0.7 + 0.15));
    addMarker(point, i);
    //markers.push(new BMap.Marker(point));
}

var markerClusterer = new BMapLib.MarkerClusterer(map, {
    markers : markers
});

var opts = {
    width : 250,
    height : 100,
    title : "Hello"
};
var infoWindow = new BMap.InfoWindow("World", opts);
map.openInfoWindow(infoWindow, map.getCenter());

var polyline = new BMap.Polyline([new BMap.Point(116.399, 39.910), new BMap.Point(116.405, 39.920)], {
    strokeColor : "blue",
    strokeWeight : 6,
    strokeOpacity : 0.5
});
map.addOverlay(polyline);

function SquareOverlay(center, length, color) {
    this._center = center;
    this._length = length;
    this._color = color;
}

// SquareOverlay.prototype = new BMap.Overlay();
// SquareOverlay.prototype.initialize = function(map) {
// this._map = map;
// var div = document.createElement("div");
// div.style.position = "absolute";
// div.style.width = this._length + "px";
// div.style.height = this._length + "px";
// div.style.background = this._color;
// map.getPanes().markerPane.appendChild(div);
// this._div = div;
// return div;
// };
// SquareOverlay.prototype.draw = function() {
// var position = this._map.pointToOverlayPixel(this._center);
// this._div.style.left = position.x - this._length / 2 + "px";
// this._div.style.top = position.y - this._length / 2 + "px";
// };
// SquareOverlay.prototype.show = function() {
// if (this._div) {
// this._div.style.display = "";
// }
// };
// SquareOverlay.prototype.hide = function() {
// if (this._div) {
// this._div.style.display = "none";
// }
// };
// var point = new BMap.Point(116.404, 39.915);
// var mySquare = new SquareOverlay(map.getCenter(), 100, "red");
// map.addOverlay(mySquare);

// var traffic = new BMap.TrafficLayer();
// map.addTileLayer(traffic);

// var local = new BMap.LocalSearch("北京市", {
// renderOptions : {
// map : map,
// autoViewport : true
// },
// pageCapacity : 8
// });
//local.search("中关村");

// var options = {
// onSearchComplete : function(results) {
// if (local.getStatus() == BMAP_STATUS_SUCCESS) {
// console.log(results);
// }
// }
// };
// var local = new BMap.LocalSearch(map, options);
// local.search("公园");

var transit = new BMap.TransitRoute(map, {
    renderOptions : {
        map : map
    }
});
transit.search("王府井", "西单");

