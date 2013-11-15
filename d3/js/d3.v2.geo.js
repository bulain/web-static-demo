var projection = d3.geo.mercator().translate([0, 0]).scale([1000]);

var width = 1200;
var height = 800;

var path = d3.geo.path().projection(projection);

var svg = d3.select("#chart").append("svg").attr('width', width).attr('height', height);

svg.append('rect').attr('width', width).attr('height', height).attr('class', 'backgound');

var c = [width/2, height/2]
var g3 = svg.append('g').attr('transform', 'translate(' + c[0] + ',' + c[1] + ')');

d3.json('countries.geo.json', function(json) {
  g3.selectAll("path").data(json.features).enter().append("path").attr('class', 'base').attr("d", path);
});

var zoom = d3.behavior.zoom().translate(c).scale(1).on('zoom', function() {
  var t = d3.event.translate;
  var s = d3.event.scale;
  g3.attr('transform', 'translate(' + t[0] + ',' + t[1] + ') scale(' + s + ')');
});

svg.call(zoom);
