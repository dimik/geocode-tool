ym.modules.define('base-geocode-model', [
  'util.defineClass',
  'util.extend',
  'proxy-geocode-provider',
  'geocode'
], function (provide, defineClass, extend, ProxyGeocodeProvider, geocode) {
  var BaseGeocodeModel = defineClass(function (data, options) {
    this._data = data || '';
    this._options = options;
    this._response = null;
    this._error = null;
    this._provider = new ProxyGeocodeProvider(options.provider);
  }, {
    geocode: function (options) {
      var promise;

      this.each(function (it) {
        promise = geocode(it.request, extend({}, options, it.options, {
          provider: this._provider
        }));
      });

      return promise.then(this._onLoad, this._onError, this);
    },
    /**
     * Should be overrided
     */
    each: function (fn) {},
    clear: function () {
      this._data = null;
      this._response = null;
      this._error = null;
    },
    getData: function () {
      return this._data;
    },
    getResponse: function () {
      return this._response;
    },
    getError: function () {
      return this._error;
    },
    _onLoad: function (response) {
      return this._response = response.data;
    },
    _onError: function (err) {
      throw this._error = err;
    }
  });

  provide(BaseGeocodeModel);
});
