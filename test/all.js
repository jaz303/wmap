var test = require('tape');
var wmap = require('../');

test('get unset key is undefined', function(t) {
    var m = wmap();
    t.ok(m.get('foo') === undefined);
    t.end();
});

test('get set key returns value', function(t) {
    var m = wmap();
    m.set('k', 'v');
    t.ok(m.get('k') === 'v');
    t.end();
});

test('remove key makes mapping undefined', function(t) {
    var m = wmap();
    m.set('k', 'v');
    m.remove('k');
    t.ok(m.get('k') === undefined);
    t.end();
});

test('updating watched key triggers callback', function(t) {
    var m = wmap();

    var a = [];

    m.set('a', 'A');

    m.watch(['a', 'b', 'c'], function(k, oldValue, newValue) {
        a.push(k);
        a.push(oldValue);
        a.push(newValue);
    });

    m.set('a', 'A\'');
    m.set('b', 'B');

    t.deepEqual(['a', 'A', 'A\'', 'b', undefined, 'B'], a);
    t.end();
});

test('updating unwatched key does not trigger callback', function(t) {

    var m = wmap();
    var a = 0;

    m.watch(['a'], function() {
        a += 1;
    });

    m.set('b', 20);

    t.ok(a === 0);
    t.end();

});

test('removing watched key triggers callback', function(t) {

    var m = wmap();
    var a = 0;

    m.set('a', 20);

    m.watch(['a'], function() {
        a += 1;
    });

    m.remove('a');

    t.ok(a === 1);
    t.end();

});

test('unsubscribe', function(t) {

    var m = wmap();
    var a = 0;

    var un = m.watch(['a'], function() {
        a = 10;
    });

    un();

    m.set('a', 100);

    t.ok(a === 0);
    t.end();
    
});