var position = new AMap.LngLat(116.397428, 39.90923);
var mapObj = new AMap.Map("container", {
    view : new AMap.View2D({
        center : position,
        zoom : 14,
        rotation : 0,
        resizeEnable: true
    }),
    lang : "zh_cn"
});

var lnglatXY = new AMap.LngLat(116.396574, 39.992706);

var marker = new AMap.Marker({
    map : mapObj,
    icon : new AMap.Icon({
        image : "http://webapi.amap.com/images/marker.png",
        size : new AMap.Size(58, 30),
        imageOffset : new AMap.Pixel(-32, -0)
    }),
    position : lnglatXY,
    offset : new AMap.Pixel(-5, -30)
});
//mapObj.setFitView();

marker = new AMap.Marker({
    icon : "http://webapi.amap.com/images/marker_sprite.png",
    position : new AMap.LngLat(116.605467, 39.807761)
});
marker.setMap(mapObj);

var lngX = 116.397428;
var latY = 39.90923;
var lineArr = new Array();
lineArr.push(new AMap.LngLat(lngX, latY));
for (var i = 1; i < 20; i++) {
    lngX = lngX + Math.random() * 0.05;
    if (i % 2) {
        latY = latY + Math.random() * 0.0001;
    } else {
        latY = latY + Math.random() * 0.06;
    }
    lineArr.push(new AMap.LngLat(lngX, latY));
}
var polyline = new AMap.Polyline({
    map : mapObj,
    path : lineArr,
    strokeColor : "#00A",
    strokeOpacity : 1,
    strokeWeight : 3,
    strokeStyle : "solid"
});
mapObj.setFitView();

mapObj.plugin(["AMap.Scale"], function() {
    var scale = new AMap.Scale();
    mapObj.addControl(scale);
});
mapObj.plugin(["AMap.ToolBar"], function() {
    var toolBar = new AMap.ToolBar();
    mapObj.addControl(toolBar);
});
mapObj.plugin(["AMap.MapType"], function() {
    var mapType = new AMap.MapType({
        defaultType : 0,
        showRoad : false
    });
    mapObj.addControl(mapType);
});

