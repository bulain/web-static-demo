$(document).ready(function() {

  $('#github').click(function() {
    hello('github').login();
  });
  $('#google').click(function() {
    hello('google').login();
  });
  $('#linkedin').click(function() {
    hello('linkedin').login();
  });
  $('#windows').click(function() {
    hello('windows').login();
  });
  $('#logout').click(function() {
    hello('github').logout();
    $('#github').html('github');
    $('#profile').html('');
  });

  hello.on('auth.login', function(auth) {
    var network = auth.network;

    hello(network).api('/me').success(function(r) {
      hello.api(network + ':/me', function(p) {
        $('#' + network).html("<img src='" + p.thumbnail + "' width=24/>Connected to " + network + " as " + p.name);
      });
      hello.api(network + ':/user/repos', function(r) {
        var data = r.data;

        for ( var i = 0; i < data.length; i++) {
          var li = document.createElement('li');
          var a = document.createElement('a');
          a.innerHTML = data[i].full_name;
          a.href = data[i].html_url;
          li.appendChild(a);
          $('#profile').append(li);
        }
      });
    });
  });

  hello.init({
    github : '',
    google : '',
    linkedin : '',
    windows : '',
  }, {
    redirect_uri : 'http://localhost/web-static-demo/hello/js/redirect.html',
    oauth_proxy : 'http://localhost:3000/oauthproxy'
  // oauth_proxy :
  // 'http://localhost/web-static-demo/hello/js/oauth.proxy.html'
  });

});