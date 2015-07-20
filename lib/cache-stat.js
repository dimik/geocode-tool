var inherit = require('inherit');

module.exports = inherit({
  __constructor: function (provider) {
    this._provider = provider;
    this._stat = {
      hit: 0,
      miss: 0
    };
    this._setupListeners();
  },
  get: function () {
    return this._stat;
  },
  reset: function () {
    this._stat.hit = this._stat.miss = 0;
  },
  destroy: function () {
    this._clearListeners();
    this._provider = null;
  },
  _setupListeners: function () {
    this._onRequestFound = this._onRequestFound.bind(this);
    this._onRequestStart = this._onRequestStart.bind(this);

    this._provider.events.on('requestfound', this._onRequestFound);
    this._provider.events.on('requeststart', this._onRequestStart);
  },
  _clearListeners: function () {
    this._provider.events.removeListener('requestfound', this._onRequestFound);
    this._provider.events.removeListener('requeststart', this._onRequestStart);
  },
  _onRequestFound: function () {
    this._stat.hit++;
  },
  _onRequestStart: function () {
    this._stat.miss++;
  }
});
