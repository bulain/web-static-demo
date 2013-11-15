var dispatch1 = d3.dispatch("start", "end");
dispatch1.on("start", function() {
  console.log('dispatch1 start.1');
});
dispatch1.on("start", function() {
  console.log('dispatch1 start.2');
});
dispatch1.on("end", function() {
  console.log('dispatch1 ending');
});
dispatch1.start();
console.log('dispatch1 testing');
dispatch1.end();

var dispatch2 = d3.dispatch("start");
dispatch2.on("start", function() {
  console.log('dispatch2 starting');
});
dispatch2.start();

var dispatch3 = d3.dispatch("start");
dispatch3.on("start", function(d) {
  console.log('dispatch3 starting ' + d);
});
dispatch3.start('parameter1');

var dispatch4 = d3.dispatch("start");
dispatch4.on("start.test1", function() {
  console.log('dispatch4 start.test1');
});
dispatch4.on("start.test2", function() {
  console.log('dispatch4 start.test2');
});
dispatch4.start();

var Dispatch = d3.dispatch;
var dispatch5 = new Dispatch('start');
dispatch5.on("start", function() {
  console.log('dispatch5 start');
});
dispatch5.start();

var dispatch6 = new Dispatch('initialized');
var dispatch7 = new Dispatch('initialized');
dispatch6.on("initialized", function() {
  console.log('dispatch6 initialized');
});
dispatch7.on("initialized", function() {
  console.log('dispatch7 initialized');
});
dispatch6.initialized();
dispatch7.initialized();
