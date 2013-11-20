# wmap

Map string keys to value with the added ability to specify observer functions for multiple keys.

## Usage

Install:

    $ npm install wmap

Create:

    var wmap = require('wmap');
    var myMap = wmap();

Set some keys:

    myMap.set('foo', 10);
    myMap.set('bar', 15);

Watch a bunch of keys for changes:

    var unsubscribe = myMap.watch(['foo', 'bar', 'baz'], function(key, oldValue, newValue) {
        // ...
    });

Cancel the subscription:

    unsubscribe();

## API

### `map.get(key)`

Return element associated with `key`, or `undefined` if no mapping exists.

### `map.set(key, value)`

Associate `value` with `key`, triggering any observers set on `key`.

### `map.remove(key)`

Remove mapping for `key`, triggering any observers set on `key`.

### `map.watch(keys, cb)`

Watch the given array of keys for changes, invoking the supplied callback function whenever mappings for the supplied keys are created, updated or removed. The callback receives 3 arguments: key, previous value and new value. `map.watch()` returns a function that can be called to cancel the subscription.