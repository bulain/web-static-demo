var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

d3.select("div").selectAll("div").data(dataset).enter().append("div").attr("class", "bar").style("height", function(d) {
  var barHeight = d * 5;
  return barHeight + "px";
});

// Width and height
var w = 500;
var h = 100;
var barPadding = 1;

var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

// Create SVG element
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

svg.selectAll("rect").data(dataset).enter().append("rect").attr("x", function(d, i) {
  return i * (w / dataset.length);
}).attr("y", function(d) {
  return h - (d * 4);
}).attr("width", w / dataset.length - barPadding).attr("height", function(d) {
  return d * 4;
}).attr("fill", function(d) {
  return "rgb(0, 0, " + (d * 10) + ")";
});

svg.selectAll("text").data(dataset).enter().append("text").text(function(d) {
  return d;
}).attr("text-anchor", "middle").attr("x", function(d, i) {
  return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
}).attr("y", function(d) {
  return h - (d * 4) + 14;
}).attr("font-family", "sans-serif").attr("font-size", "11px").attr("fill", "white");

// Width and height
var w = 500;
var h = 100;
var padding = 20;

var dataset = [[5, 20], [480, 90], [250, 50], [100, 33], [330, 95], [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]];

// Create scale functions
var xScale = d3.scale.linear().domain([0, d3.max(dataset, function(d) {
  return d[0];
})]).range([padding, w - padding * 2]);

var yScale = d3.scale.linear().domain([0, d3.max(dataset, function(d) {
  return d[1];
})]).range([h - padding, padding]);

// Create SVG element
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

svg.selectAll("circle").data(dataset).enter().append("circle").attr("cx", function(d) {
  return xScale(d[0]);
}).attr("cy", function(d) {
  return yScale(d[1]);
}).attr("r", function(d) {
  return Math.sqrt(h - d[1]);
});

svg.selectAll("text").data(dataset).enter().append("text").text(function(d) {
  return d[0] + "," + d[1];
}).attr("x", function(d) {
  return xScale(d[0]);
}).attr("y", function(d) {
  return yScale(d[1]);
}).attr("font-family", "sans-serif").attr("font-size", "11px").attr("fill", "red");

// Width and height
var w = 500;
var h = 300;
var padding = 30;

/*
 * //Static dataset var dataset = [ [5, 20], [480, 90], [250, 50], [100, 33],
 * [330, 95], [410, 12], [475, 44], [25, 67], [85, 21], [220, 88], [600, 150] ];
 */

// Dynamic, random dataset
var dataset = []; // Initialize empty array
var numDataPoints = 50; // Number of dummy data points to create
var xRange = Math.random() * 1000; // Max range of new x values
var yRange = Math.random() * 1000; // Max range of new y values
for ( var i = 0; i < numDataPoints; i++) { // Loop numDataPoints times
  var newNumber1 = Math.floor(Math.random() * xRange); // New random integer
  var newNumber2 = Math.floor(Math.random() * yRange); // New random integer
  dataset.push([newNumber1, newNumber2]); // Add new number to array
}

// Create scale functions
var xScale = d3.scale.linear().domain([0, d3.max(dataset, function(d) {
  return d[0];
})]).range([padding, w - padding * 2]);

var yScale = d3.scale.linear().domain([0, d3.max(dataset, function(d) {
  return d[1];
})]).range([h - padding, padding]);

var rScale = d3.scale.linear().domain([0, d3.max(dataset, function(d) {
  return d[1];
})]).range([2, 5]);

var formatAsPercentage = d3.format(".1%");

// Define X axis
var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5).tickFormat(formatAsPercentage);

// Define Y axis
var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5).tickFormat(formatAsPercentage);

// Create SVG element
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

// Create circles
svg.selectAll("circle").data(dataset).enter().append("circle").attr("cx", function(d) {
  return xScale(d[0]);
}).attr("cy", function(d) {
  return yScale(d[1]);
}).attr("r", function(d) {
  return rScale(d[1]);
});

// Create X axis
svg.append("g").attr("class", "axis").attr("transform", "translate(0," + (h - padding) + ")").call(xAxis);

// Create Y axis
svg.append("g").attr("class", "axis").attr("transform", "translate(" + padding + ",0)").call(yAxis);
