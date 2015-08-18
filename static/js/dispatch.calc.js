/*var orders = [{
 fm : new Date("2015-04-17 08:00:00"),
 to : new Date("2015-04-17 10:00:00")
 }, {
 fm : new Date("2015-04-17 09:00:00"),
 to : new Date("2015-04-17 11:00:00")
 }, {
 fm : new Date("2015-04-17 10:00:00"),
 to : new Date("2015-04-17 12:00:00")
 }, {
 fm : new Date("2015-04-17 11:00:00"),
 to : new Date("2015-04-17 12:00:00")
 }];*/
/*var orders = [{
 fm : new Date("2015-04-17 08:00:00"),
 }, {
 fm : new Date("2015-04-17 09:00:00"),
 }, {
 to : new Date("2015-04-17 12:00:00")
 }, {
 to : new Date("2015-04-17 11:00:00"),
 }];*/
var orders = [];
var base1 = new Date("2015-04-17 08:00:00");
var base2 = new Date("2015-04-17 14:00:00");
for (var i = 0; i < 10; i++) {
    var diff1 = Math.floor(Math.random() * (4 * 60 * 60 * 1000));
    var diff2 = Math.floor(Math.random() * (6 * 60 * 60 * 1000));
    var xx1 = Math.floor(Math.random() * 10);
    var xx2 = Math.floor(Math.random() * 10);
    orders.push({
        fm : (xx1 < 5) ? null : new Date(base1.getTime() + diff1),
        to : (xx2 < 5) ? null : new Date(base2.getTime() + diff2)
    });
}

//开始
var z = 10;
var n = orders.length;
var minDate = new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000);
var maxDate = new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000);

var minus = function(d, m) {
    return new Date(d.getTime() - m * 60 * 1000);
};
var min = function(arr) {
    return arr.reduce(function(a, b) {
        return (a.getTime() < b.getTime() ? a : b);
    }, maxDate);
};
var max = function(arr) {
    return arr.reduce(function(a, b) {
        return (a.getTime() > b.getTime() ? a : b);
    }, minDate);
};

var maxFm = max(orders.map(function(d) {
    return d.fm || minDate;
}));
var minFm = min(orders.map(function(d) {
    return d.fm || maxDate;
}));
var maxTo = max(orders.map(function(d) {
    return d.to || minDate;
}));
var minTo = min(orders.map(function(d) {
    return d.to || maxDate;
}));

var wFm = max([minus(maxFm, (n - 1) * z), minFm]);
var wTo = min([minus(maxTo, (n - 1) * z), minTo]);

//结束

Date.prototype.format = function(fmt) {//author: meizz
    var o = {
        "M+" : this.getMonth() + 1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth() + 3) / 3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

var format = function(d) {
    if ( d instanceof Date) {
        return d.format("yyyy-MM-dd hh:mm:ss");
    }
    return "                   ";
};

orders.sort(function(a, b) {
    return (a.fm || minDate).getTime() - (b.fm || minDate).getTime();
}).forEach(function(d) {
    console.log("订单时间为:" + format(d.fm) + "-->" + format(d.to));
});
console.log("\n");
console.log("运单时间为:" + format(wFm) + "-->" + format(wTo));
