define('b', [], function() {
  return {
    b : true
  };
});
define('a', ["b"], function(b) {
  b.a = true;
  return b;
});
require(['a'], function(a) {
  console.log(a);
});