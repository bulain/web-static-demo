module('Collections');

asyncTest('d3.html', 2, function(assert) {
  var files = ['../../static/js/jquery.cookie.extend.js.test.html', '../../static/js/jquery.cookie.menu.js.demo.html',
      '../../static/js/jquery.cookie.menu.js.test.html'];
  async.map(files, function(file, cb) {
    d3.html(file, function(d) {
      var err = d ? null : new Error("File Not Found");
      cb(err, file);
    });
  }, function(err, results) {
    assert.equal(err, null, 'should be no error.');
    assert.deepEqual(results, files, 'should be same order with input.');
    start();
  });
});

test('concurrent', 6, function(assert) {
  stop();
  stop();
  stop();

  var queue = {};
  var eachFn = function(file) {
    console.log(file);
  };
  var summaryFn = function(err, results) {
    start();
  };

  concurrent(1, eachFn, function(err, results) {
    start();
  });
  
  concurrent(2, eachFn, summaryFn);
  concurrent(3, eachFn, summaryFn);

  function concurrent(index, eachFn, summaryFn) {
    var files = ['../../static/js/jquery.cookie.extend.js.test.html',
        '../../static/js/jquery.cookie.menu.js.demo.html', '../../static/js/jquery.cookie.menu.js.test.html'];
    async.map(files, function(file, cb) {
      var func = function(err, file) {
        eachFn(file);
        cb(err, file);
      };
      if (queue[file] && queue[file].result) {
        func(null, file);
      } else if (queue[file]) {
        queue[file].fns.push(func);
      } else {
        queue[file] = {
          args : file,
          fns : [func]
        };
        d3.html(file, function(d) {
          var err = d ? null : new Error("File Not Found");
          console.log(file + ' - ' + index + ' - ' + 'ajax');

          queue[file].result = d;
          var fns = queue[file].fns.slice();
          queue[file].fns.length = 0;
          fns.forEach(function(fn) {
            fn(err, file);
          });
        });
      }
    }, function(err, results) {
      assert.equal(err, null, 'should be no error.');
      assert.deepEqual(results, files, 'should be same order with input.');
      summaryFn(err, results);
    });
  }
});
