# wmap

Map string keys to value with the added ability to specify observer functions for multiple keys.

## Usage

Install:

    $ npm install wmap

Create:

    var wmap = require('wmap');
    var myMap = wmap();

## API

### `map.get(key)`

Return element associated with `key`, or `undefined` if no mapping exists.

### `map.set(key, value)`

Associate `value` with `key`, triggering any observers set on `key`.

### `map.remove(key)`

Remove mapping for `key`, triggering any observers set on `key`.

### `map.watch(keys, cb)`

Watch the given array of keys for changes, invoking the supplied callback function whenever mappings for the supplied keys are created, updated or removed. The callback receives 3 arguments: key, previous value and new value. `map.watch()` returns a function that can be called to cancel the subscription.