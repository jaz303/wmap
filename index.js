function WMap(parent) {
    this._entries = {};
    this._watchers = {};
}

WMap.prototype.get = function(key) {
    return this._entries[key];
}

WMap.prototype.set = function(key, value) {
    var vb = this._entries[key];
    this._entries[key] = value;
    this._dispatch(key, vb, value);
}

WMap.prototype.remove = function(key) {
    var vb = this._entries[key];
    delete this._entries[key];
    this._dispatch(key, vb, undefined);
}

WMap.prototype.watch = function(keys, cb) {

    if (!Array.isArray(keys))
        keys = [keys];

    var ws = this._watchers;

    keys.forEach(function(k) {
        (k in ws) ? ws[k].push(cb) : (ws[k] = [cb]);
    }, this);

    return function() {
        keys.forEach(function(k) {
            var kws = ws[k];
            for (var i = 0; i < kws.length; ++i) {
                if (kws[i] === cb) {
                    kws.splice(i, 1);
                    return;
                }
            }
        });
    };

}

WMap.prototype._dispatch = function(key, oldValue, newValue) {

    var ws = this._watchers[key];

    if (!ws)
        return;

    ws.forEach(function(c) { c(key, oldValue, newValue); });

}

module.exports = function() {
    return new WMap();
}
