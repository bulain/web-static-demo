module('日期格式化');

test('日期格式化', function(assert) {
    var date = new Date(1474430513234);
    assert.equal(moment(date).format('YYYY-MM-DD HH:mm:ss'), '2016-09-21 12:01:53', 'moment(date).format(\'YYYY-MM-DD HH:mm:ss\') -> 2016-09-21 12:01:53');
});
