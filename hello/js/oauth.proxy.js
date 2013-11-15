var href = decodeURIComponent(window.location.href);
var params = href.split('?');
var hash = {};
params[1].split('&').forEach(function(d) {
  var p = d.split('=');
  hash[p[0]] = p[1];
});
var state = JSON.parse(hash.state);
var secret = {
  '' : '',
  '' : '',
  '' : '',
  '' : ''
};
var url = state.oauth.grant;
var client_id = state.client_id;
var redirect_uri = hash.redirect_uri;
var client_secret = secret[state.client_id];
var code = hash.code;

var data = {
  client_id : client_id,
  redirect_uri : redirect_uri,
  client_secret : client_secret,
  code : code
};

$.ajax({
  type : 'get',
  url : url,
  data : data
}).success(function(d) {
  window.location.href = [redirect_uri, '?', d].join('');
}).fail(function(e) {
  console.log(e);
});
