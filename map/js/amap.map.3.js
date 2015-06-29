var position = new AMap.LngLat(116.397428, 39.90923);
var mapObj = new AMap.Map("container", {
    view : new AMap.View2D({
        center : position,
        zoom : 14,
        rotation : 0,
        resizeEnable : true
    }),
    lang : "zh_cn"
});

var sh = [];
//lat: 31.088524 lng: 121.506172
var bj = [];
//lat: 39.97702 lng: 116.306145

AMap.service(["AMap.Geocoder"], function() {
    var MGeocoder = new AMap.Geocoder({
        city : "010",
        radius : 1000
    });
    MGeocoder.getLocation("北京市海淀区苏州街", function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            console.log(result);
        }
    });
    MGeocoder = new AMap.Geocoder({
        city : "021",
        radius : 1000
    });
    MGeocoder.getLocation("上海市闵行区浦江镇", function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            console.log(result);
        }
    });
});

var map, walking;
var keywords = [];
AMap.service('AMap.Driving', function() {
    walking = new AMap.Driving();
    keywords = [];
    keywords.push({
        keyword : '北京南站',
        city : '北京市'
    }, {
        keyword : '北京站',
        city : '北京市'
    });
    walking.search(keywords, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            console.log(result);

            var lines = [];
            var steps = result.routes[0].steps;
            steps.forEach(function(d) {
                lines = lines.concat(d.path);
            });
            //console.log(lines);

            var polyline = new AMap.Polyline({
                map : mapObj,
                path : lines,
                strokeColor : "#0000FF",
                strokeOpacity : 0.7,
                strokeWeight : 4,
                strokeDasharray : [10, 5]
            });
            mapObj.setFitView();

            console.log(lines.length);

            var start = lines[0];
            var log = [];
            var cnt = 0;
            var marker = new AMap.Marker({
                map : mapObj,
                icon : new AMap.Icon({
                    image : "http://webapi.amap.com/images/marker.png",
                    size : new AMap.Size(58, 40),
                    imageOffset : new AMap.Pixel(0, 0)
                }),
                position : start,
                offset : new AMap.Pixel(0, -37)
            });
            /*AMap.event.addListener(marker, "moveend", function() {
            console.log(log.length);
            });*/

            //log.push(start);
            /*var i = 1;
             var move = function() {
             if (i >= lines.length) {
             return;
             }
             console.log('before:' + i);
             while (lines[i - 1].lng == lines[i].lng && lines[i - 1].lat == lines[i].lat) {
             i++;
             if (i >= lines.length) {
             return;
             }
             }
             console.log('after:' + i);
             marker.moveTo(lines[i], 1000);
             };

             AMap.event.addListener(marker, "moveend", function() {
             i++;
             move(i);
             });

             move();*/

            var bool = true;
            var all = [];
            var rest = [];
            var curr;
            
            var points = lines.map(function(d){
                return [d.lng, d.lat];
            });

            marker.moveAlong(lines, 10000, function(d) {
                console.log(d);
                var p = marker.getPosition();
                all.push(p);
                if (!bool) {
                    rest.push(p);
                }
            }, false);

            setTimeout(function() {
                //marker.stopMove();
                bool = false;
                curr = marker.getPosition();
                marker.hide();
                
                var x = new AMap.Marker({
                    map : mapObj,
                    icon : new AMap.Icon({
                        image : "http://webapi.amap.com/images/marker.png",
                        size : new AMap.Size(58, 40),
                        imageOffset : new AMap.Pixel(0, 0)
                    }),
                    position : curr,
                    offset : new AMap.Pixel(0, -37)
                });
                
            }, 5000);

            AMap.event.addListener(marker, "movealong", function() {
                console.log(rest);
                marker.show();
                //marker.setPosition(curr);
            });
        }
    });
});
