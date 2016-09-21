module('数字格式化');

test('整数格式化(默认格式) ', function(assert) {
    assert.equal(numeral(1).format(), '1');
    assert.equal(numeral(1000).format(), '1,000');
    assert.equal(numeral(1000000).format(), '1,000,000');
});

test('整数格式化(指定格式"0") ', function(assert) {
    assert.equal(numeral(1).format('0'), '1');
    assert.equal(numeral(1000).format('0'), '1000');
    assert.equal(numeral(1000000).format('0'), '1000000');
});

test('整数格式化(指定格式"0,0") ', function(assert) {
    assert.equal(numeral(1).format('0,0'), '1');
    assert.equal(numeral(1000).format('0,0'), '1,000');
    assert.equal(numeral(1000000).format('0,0'), '1,000,000');
});


test('小数格式化(默认)', function(assert) {
    assert.equal(numeral(1.0).format(), '1');
    assert.equal(numeral(1.123456).format(), '1');
    assert.equal(numeral(10000.123456).format(), '10,000');
    assert.equal(numeral(10000.654321).format(), '10,001');
    assert.equal(numeral(10000.567895).format(), '10,001');
});

test('小数格式化(指定格式"0.00")', function(assert) {
    assert.equal(numeral(1.0).format('0.00'), '1.00');
    assert.equal(numeral(1.123456).format('0.00'), '1.12');
    assert.equal(numeral(10000.123456).format('0.00'), '10000.12');
    assert.equal(numeral(10000.654321).format('0.00'), '10000.65');
    assert.equal(numeral(10000.567895).format('0.00'), '10000.57');
});

test('小数格式化(指定格式"0,0.00")', function(assert) {
    assert.equal(numeral(1.0).format('0,0.00'), '1.00');
    assert.equal(numeral(1.123456).format('0,0.00'), '1.12');
    assert.equal(numeral(10000.123456).format('0,0.00'), '10,000.12');
    assert.equal(numeral(10000.654321).format('0,0.00'), '10,000.65');
    assert.equal(numeral(10000.567895).format('0,0.00'), '10,000.57');
});
