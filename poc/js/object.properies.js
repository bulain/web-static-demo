require(['jquery', 'd3'], function($) {
  "use strict";
  //globel
  var clzes = [Array, Boolean, Date, Function, Number, Object, RegExp, String];
  $('div#globel').append('<div><h3>Class and Class.prototype property list</h3></div>');
  clzes.forEach(function(obj) {
    var div = $('<div class="row-fluid v-item"></div>').appendTo('div#globel');
    appendOlToDiv(obj, div, obj.name);
    appendOlToDiv(obj['prototype'], div, obj.name + '.prototype');
  });
  
  //Math
  var utils = [Math, JSON];
  $('div#utils').append('<div><h3>Utils property list</h3></div>');
  utils.forEach(function(obj) {
    var div = $('<div class="row-fluid v-item"></div>').appendTo('div#utils');
    appendOlToDiv(obj, div, obj);
  });
  
  //dom
  var doms = [[document.createElement('span'), document.createElement('div')]];
  $('div#dom').append('<div><h3>Dom property list</h3></div>');
  doms.forEach(function(dom) {
    var div = $('<div class="row-fluid v-item"></div>').appendTo('div#dom');
    appendOlToDiv(dom[0], div, dom[0].localName);
    appendOlToDiv(dom[1], div, dom[1].localName);
  });
  
  var objects = [d3, d3.geo.mercator(), d3.geo.path()];
  $('div#d3').append('<div><h3>D3 property list</h3></div>');
  objects.forEach(function(obj) {
    var div = $('<div class="row-fluid v-item"></div>').appendTo('div#d3');
    appendOlToDiv(obj, div, obj.name || obj.version);
  });
  
  var objects = [$];
  $('div#jquery').append('<div><h3>jQuery property list</h3></div>');
  objects.forEach(function(obj) {
    var div = $('<div class="row-fluid v-item"></div>').appendTo('div#jquery');
    appendOlToDiv(obj, div, obj.name);
  });
  
  function appendOlToDiv(obj, div, name) {
    var div = $('<div class="span6"></div>').appendTo(div);
    div.append('<div>Object.getOwnPropertyNames(' + name + ')</div>')
    var ol = $('<ol></ol>').appendTo(div);

    var props = Object.getOwnPropertyNames(obj);
    props.sort();
    props.forEach(function(prop) {
      ol.append('<li>' + prop + '</li>');
    });
  }
  
});