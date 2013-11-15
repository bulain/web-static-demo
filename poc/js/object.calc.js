require(['jquery', 'd3'], function($) {

  var objects = [['div', 'span']];
  var visibilities = ['visible', 'hidden'];
  var displays = ['none', 'inline', 'block', 'inline-block', 'inherit'];
  var paddings = ['0px 0px 0px 0px', '2px 2px 2px 2px'];
  var margins = ['0px 0px 0px 0px', '2px 2px 2px 2px'];

  $('div#domCalc').append('<div><h3>Dom clalulate width and height</h3></div>');
  objects.forEach(function(obj) {
    var div = $('<div class="row-fluid v-item"></div>').appendTo('div#domCalc');
    appendToDiv(obj, div);
  });

  function appendToDiv(obj, div) {
    var header = $('<div class="row-fluid"></div>').appendTo(div);
    obj.forEach(function(d) {
      header.append('<div class="span6"><h5>' + d + ' clalulate width and height</h5></div>')
    });

    var items = [];
    items = items.concat(visibilities.map(function(visibility) {
      return 'visibility:' + visibility + ';';
    }));
    items = items.concat(displays.map(function(display) {
      return 'display:' + display + ';';
    }));
    items = items.concat(paddings.map(function(padding) {
      return 'padding:' + padding + ';';
    }));
    items = items.concat(margins.map(function(margin) {
      return 'margin:' + margin + ';';
    }));

    items.forEach(function(style) {
      var block = $('<div class="row-fluid"></div>').appendTo(div);
      var items = getSingleItemFromStyle(obj, style);
      items.forEach(function(d) {
        appendItem(d, block, style);
      });
    });

    items = [];
    items = items.concat(displays.map(function(display) {
      return 'display:' + display + ';';
    }));
    items = items.concat(['padding:2px 2px 2px 2px;', 'margin:2px 2px 2px 2px;']);
    items.forEach(function(style) {
      var block = $('<div class="row-fluid"></div>').appendTo(div);
      var items = getParentChildItemFromStyle(obj, style);
      items.forEach(function(d) {
        appendItem(d, block, style);
      });
    });

    items.forEach(function(style) {
      var block = $('<div class="row-fluid"></div>').appendTo(div);
      var items = getCrossItemFromStyle(obj, style);
      items.forEach(function(d) {
        appendItem(d, block, style);
      });
    });
    
    items.forEach(function(style) {
      var block = $('<div class="row-fluid"></div>').appendTo(div);
      var items = getSlefStyleCrossItemFromStyle(obj, style);
      items.forEach(function(d) {
        appendItem(d, block, style);
      });
    });
  }

  function getSingleItemFromStyle(obj, style) {
    return obj.map(function(tag) {
      return '<' + tag + ' style="' + style + '">This is test.</' + tag + '>';
    });
  }

  function getParentChildItemFromStyle(obj, style) {
    var items = getSingleItemFromStyle(obj, style);
    return items.map(function(item, i) {
      return '<' + obj[i] + '>' + item + item + '</' + obj[i] + '>';
    });
  }

  function getCrossItemFromStyle(obj, style) {
    var items = getSingleItemFromStyle(obj, style);
    return items.map(function(item, i) {
      var index = i === 1 ? 0 : 1;
      return '<' + obj[index] + '>' + item + item + '</' + obj[index] + '>';
    });
  }

  function getSlefStyleCrossItemFromStyle(obj, style) {
    var items = getSingleItemFromStyle(obj, style);
    return items.map(function(item, i) {
      return '<' + obj[i] + ' style=' + style + '>' + item + item + '</' + obj[i] + '>';
    });
  }

  function appendItem(obj, div, style) {
    var block = $('<div class="span6 v-block"></div>').appendTo(div);
    block.append('<div>' + obj.replace(/\</gi, '&lt;') + '</div>');
    var item = $(obj).appendTo(block);
    var node = item.get(0);
    var calc = $('<div></div>').appendTo(block);

    var props = [['offsetWidth', 'outerWidth'], ['offsetHeight', 'outerHeight'], ['clientWidth', 'width'],
        ['clientHeight', 'height']];
    props.forEach(function(prop) {
      row = $('<div class="row-fluid"></div>').appendTo(calc);
      row.append('<div class="span6" style="min-height: 20px;">node.' + prop[0] + ' = ' + node[prop[0]] + '</div>');
      row.append('<div class="span6" style="min-height: 20px;">$.' + prop[1] + '() = ' + item[prop[1]]() + '</div>');
    });
  }

});