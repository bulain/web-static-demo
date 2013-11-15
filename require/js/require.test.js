module('require');

test('require', 1, function (assert) {
  assert.ok(true);
});

/*
test('require inner', 1, function (assert) {
  require(['test/notexsits'], function(){
    assert.ok(true);
  });
});


require(['test/notexsits'], function(){
  test('require outer', 1, function (assert) {
    assert.ok(true);
  });
});
*/
