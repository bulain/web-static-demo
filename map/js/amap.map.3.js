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
            
            var x = [];
            lines.forEach(function(d){
                if(x.length == 0 ){
                    x.push(d);
                }else{
                    if(d.distance(x[x.length-1]) > 50){
                        x.push(d);
                    }
                }
            });
            console.log(x);
            
            markerMovingControl = new MarkerMovingControl(mapObj, marker, x);

            // console.log(lines.length);
            //
            // var start = lines[0];
            // var log = [];
            // var cnt = 0;
            // var marker = new AMap.Marker({
            // map : mapObj,
            // icon : new AMap.Icon({
            // image : "http://webapi.amap.com/images/marker.png",
            // size : new AMap.Size(58, 40),
            // imageOffset : new AMap.Pixel(0, 0)
            // }),
            // position : start,
            // offset : new AMap.Pixel(0, -37)
            // });
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

            /*var bool = true;
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
             */
        }
    });
});

/**     第一部分，动画暂停、继续的实现     */

/**
 * Marker移动控件
 * @param {Map} map    地图对象
 * @param {Marker} marker Marker对象
 * @param {Array} path   移动的路径，以坐标数组表示
 */
var MarkerMovingControl = function(map, marker, path) {
    this._map = map;
    this._marker = marker;
    this._path = path;
    this._currentIndex = 0;
    marker.setMap(map);
    marker.setPosition(path[0]);
}
/**
 * 移动marker，会从当前位置开始向前移动
 */
MarkerMovingControl.prototype.move = function() {
    if (!this._listenToStepend) {
        this._listenToStepend = AMap.event.addListener(this, 'stepend', function() {
            this.step();
        }, this);
    }
    this.step();
};

/**
 * 停止移动marker，由于控件会记录当前位置，所以相当于暂停
 */
MarkerMovingControl.prototype.stop = function() {
    this._marker.stopMove();
};

/**
 * 重新开始，会把marker移动到路径的起点然后开始移动
 */
MarkerMovingControl.prototype.restart = function() {
    this.stop();
    this._marker.setPosition(this._path[0]);
    this._currentIndex = 0;
    this.move();
};

/**
 * 向前移动一步
 */
MarkerMovingControl.prototype.step = function() {
    var nextIndex = this._currentIndex + 1;
    if (nextIndex < this._path.length) {
        if (!this._listenToMoveend) {
            this._listenToMoveend = AMap.event.addListener(this._marker, 'moveend', function() {
                this._currentIndex++;
                AMap.event.trigger(this, 'stepend');
            }, this);
        }
        // console.log(nextIndex);
        this._marker.moveTo(this._path[nextIndex], 100000);
    }
};

// 创建移动控件
var markerMovingControl;

// 编写事件响应函数
function startAnimation() {
    markerMovingControl.restart();
}

function pauseAnimation() {
    markerMovingControl.stop();
}

function continueAnimation() {
    markerMovingControl.move();
}