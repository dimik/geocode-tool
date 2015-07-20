var inherit = require('inherit');
var CacheStat = require('./cache-stat');

module.exports = inherit(CacheStat, {
  _setupListeners: function () {
    this.__base.call(this);

    var _this = this;
    this._timer = setInterval(function () {
      _this.reset();
    }, 1000 * 60 * 60 * 24);
  },
  _clearListeners: function () {
    this.__base.call(this);

    clearInterval(this._timer);
  }
});
