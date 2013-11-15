var before = {
    setup: function () {
        var cookies = document.cookie.split('; ')
        for (var i = 0, c; (c = (cookies)[i]) && (c = c.split('=')[0]); i++) {
            document.cookie = c + '=; expires=' + new Date(0).toUTCString();
        }
    }
};


module('read', before);

test('get value', 3, function () {
  document.cookie = 'menu=|a=1|b=2|c=3';
  
  QUnit.equal($.subcookie('menu', 'a'), '1', 'should return value 1');
  QUnit.equal($.subcookie('menu', 'b'), '2', 'should return value 2');
  QUnit.equal($.subcookie('menu', 'c'), '3', 'should return value 3');
});

test('read null', 2, function () {
  document.cookie = 'menu=|a=1|b=2|c=3';
  QUnit.equal($.subcookie('menu', 'd'), null, 'should return value null');
  
  document.cookie = 'menu=|a=1|b=2|c=3|d=';
  QUnit.equal($.subcookie('menu', 'd'), null, 'should return value null');
});


module('write', before);

test('set value', 3, function(){
  $.subcookie('menu', 'a', '1');
  QUnit.equal(decodeURIComponent(document.cookie), 'menu=|a=1', 'should write value 1');
  
  $.subcookie('menu', 'b', '2');
  QUnit.equal(decodeURIComponent(document.cookie), 'menu=|a=1|b=2', 'should write value 2');
  
  $.subcookie('menu', 'c', '3');
  QUnit.equal(decodeURIComponent(document.cookie), 'menu=|a=1|b=2|c=3', 'should write value 3');
  
});

test('set null', 1, function(){
  $.subcookie('menu', 'a', null);
  QUnit.equal(decodeURIComponent(document.cookie), 'menu=|a=', 'should write value 1');
});

test('set undifined', 1, function(){
  var x;
  $.subcookie('menu', 'a', x);
  QUnit.equal(decodeURIComponent(document.cookie), 'menu=|a=', 'should write value 1');
});

module('replace', before);

test('replace value', 3, function(){
  document.cookie = 'menu=|a=1|b=2|c=3';
  
  $.subcookie('menu', 'a', '4');
  QUnit.equal(decodeURIComponent(document.cookie), 'menu=|a=4|b=2|c=3', 'should replace value with 4');
  
  $.subcookie('menu', 'b', '5');
  QUnit.equal(decodeURIComponent(document.cookie), 'menu=|a=4|b=5|c=3', 'should replace value with 5');
  
  $.subcookie('menu', 'c', '6');
  QUnit.equal(decodeURIComponent(document.cookie), 'menu=|a=4|b=5|c=6', 'should replace value with 6');
  
});

test('replace with sub string', 3, function(){
  document.cookie = 'menu=|aa=1|a=1|ba=1';
  $.subcookie('menu', 'aa', '4');
  QUnit.equal(decodeURIComponent(document.cookie), 'menu=|aa=4|a=1|ba=1', 'should replace value with 4');
  
  document.cookie = 'menu=|aa=1|a=1|ba=1';
  $.subcookie('menu', 'a', '5');
  QUnit.equal(decodeURIComponent(document.cookie), 'menu=|aa=1|a=5|ba=1', 'should replace value with 5');
  
  document.cookie = 'menu=|aa=1|a=1|ba=1';
  $.subcookie('menu', 'ba', '6');
  QUnit.equal(decodeURIComponent(document.cookie), 'menu=|aa=1|a=1|ba=6', 'should replace value with 6');
});

test('handle null', 1, function(){
  document.cookie = 'menu=|a=1|b=2|c=3';
  $.subcookie('menu', 'b', null);
  QUnit.equal(decodeURIComponent(document.cookie), 'menu=|a=1|b=|c=3', 'should replace value with null');
  
});

test('handle undefined', 1, function(){
  document.cookie = 'menu=|a=1|b=2|c=3';
  var x;
  $.subcookie('menu', 'b', x);
  QUnit.equal(decodeURIComponent(document.cookie), 'menu=|a=1|b=|c=3', 'should replace value with null');
  
});