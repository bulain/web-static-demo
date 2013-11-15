require.config({
  paths : {
    jquery : '/web-static/jquery/js/jquery',
    d3 : '/web-static/d3/js/d3.v3',
    demo : 'require.demo',
  }
});
require(['jquery', 'd3'], function() {
  require(['demo'], function() {
  });
});