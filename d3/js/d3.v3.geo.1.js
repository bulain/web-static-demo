var width = 1200, height = 800;
var countries = ['RUS'];

var temp = d3.geo.path().projection(null);
var geoutil = {
  bounds : temp.bounds || d3.geo.bounds,
  centroid : temp.centroid,
  isd3v2 : !temp.bounds
}
var FIX_SCALE = geoutil.isd3v2 ? 2000 : 320, PADDING = 20;
var fixprj = d3.geo.mercator().translate([0, 0]).scale(FIX_SCALE);
var fixpath = d3.geo.path().projection(fixprj);

d3.json('countries.geo.json', function(json) {
  json.features.forEach(function(feature) {
    feature.geometry.coordinates.forEach(function(lines, i) {
      if (polygonArea(lines) < 0) {
        feature.geometry.coordinates[i] = lines.reverse();
      }
    });
  });

  var bbox;
  var features = json.features.filter(function(feature) {
    return countries.some(function(id) {
      return id === feature.id
    });
  }).forEach(function(feature) {
    bbox = geoutil.bounds(feature);
    if (geoutil.isd3v2) {
      feature.centroid = [(bbox[0][0] + bbox[1][0]) / 2, (bbox[0][1] + bbox[1][1]) / 2];
    } else {
      feature.centroid = geoutil.centroid(feature);
    }
  });

  // calculate scale
  var prj = d3.geo.mercator().translate([0, 0]).scale(FIX_SCALE);
  var lb = prj(bbox[0]), rt = prj(bbox[1]);
  var scale = Math.min((width - PADDING) / (rt[0] - lb[0]), (height - PADDING) / (lb[1] - rt[1]));

  // calculate translate
  prj.scale(scale * FIX_SCALE);
  lb = prj(bbox[0]), rt = prj(bbox[1]);
  var center = [(lb[0] + rt[0]) / 2, (lb[1] + rt[1]) / 2];
  var translate = [width / 2 - center[0], height / 2 - center[1]];

  var svg = d3.select("#chart").append("svg").attr('width', width).attr('height', height);
  svg.append('rect').attr('width', width).attr('height', height).attr('class', 'backgound');

  var gbase = svg.append('g');
  var gfeature = svg.append('g');
  var grect = svg.append('g');
  var glabel = svg.append('g');

  [gbase, gfeature, grect, glabel].forEach(function(g) {
    g.attr('transform', 'translate(' + translate[0] + ',' + translate[1] + ')' + 'scale(' + scale + ')');
  });

  gbase.selectAll("path").data(json.features).enter().append("path").attr('class', 'base').attr("d", fixpath);

  var features = json.features.filter(function(feature) {
    return countries.some(function(id) {
      return id === feature.id
    });
  });

  gfeature.selectAll("path").data(features).enter().append("path").attr('class', 'feature').attr("d", fixpath);

  grect.selectAll("path").data(features).enter().append("path").attr('class', 'rect').attr("d", function(feature) {
    return drawRect(feature, fixprj);
  });

  glabel.selectAll("text").data(features).enter().append("text").attr('class', 'text').attr("x", function(feature) {
    var center = fixprj(feature.centroid);
    return center[0];
  }).attr("y", function(feature) {
    var center = fixprj(feature.centroid);
    return center[1];
  }).text(function(feature) {
    return feature.id;
  });

  var zoom = d3.behavior.zoom().translate(translate).scale(scale).on('zoom', function() {
    var t = d3.event.translate;
    var s = d3.event.scale;

    [gbase, gfeature, grect, glabel].forEach(function(g) {
      g.attr('transform', 'translate(' + t[0] + ',' + t[1] + ') scale(' + s + ')');
    });
  });

  svg.call(zoom);

  function polygonArea(lines) {
    var area = 0;
    for ( var i = 1; i < lines.length; i++) {
      area += (lines[i - 1][0] + lines[i][0]) * (lines[i - 1][1] - lines[i][1]);
    }
    return area / 2;
  }

  function drawRect(feature, prj) {
    var bounds = geoutil.bounds(feature);
    bbox = [prj(bounds[0]), prj(bounds[1])];
    return 'M' + bbox[0] + 'L' + bbox[0][0] + ',' + bbox[1][1] + 'L' + bbox[1] + 'L' + bbox[1][0] + ',' + bbox[0][1]
        + 'Z';
  }

});