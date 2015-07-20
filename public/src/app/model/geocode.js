ym.modules.define('geocode-model', [
  'util.defineClass',
  'util.extend',
  'event.Manager',
  'data.Manager',
  'option.Manager',
  'Monitor',
  'geocode',
  'proxy-geocode-provider'
], function (provide, defineClass, extend, EventManager, DataManager, OptionManager, Monitor, geocode) {
  /**
   * Geocode Model Class.
   * @class
   * @name GeocodeModel
   * @param {Object} [options] Geocode options.
   */
  var GeocodeModel = defineClass(function (options) {
    this.events = new EventManager({ context: this });
    this.options = new OptionManager(options);
    this.data = new DataManager();
    this._setupMonitors();
  }, {
    /**
     * Geocodes model data.
     * @function
     * @name GeocodeModel.geocode
     * @param {Object} options Geocoder options implied to all requests.
     * @returns {vow.Promise} Promise resolved with geocoding results.
     */
    geocode: function (options) {
      this._fireEvent('requestsend');

      var promise;

      this.data.get('request').each(function (it) {
        promise = geocode(it, extend({}, this.options.getAll(), options));
      }, this);

      return promise.then(this._onRequestSuccess, this._onRequestFail, this);
    },
    /**
     * Destroys model.
     * @function
     */
    destroy: function () {
      this.data.unsetAll();
      this._clearMonitors();

      return this;
    },
    _setupMonitors: function () {
      this._dataMonitor = new Monitor(this.data);
      this._dataMonitor.add('request', this._onRequestChange, this);
      this._optionMonitor = new Monitor(this.options);
      this._optionMonitor.add(['boundedBy', 'strictBounds'], this._onRequestChange, this);
    },
    _clearMonitors: function () {
      this._optionMonitor.removeAll();
    },
    _onRequestChange: function () {
      this._fireEvent('requestchange');
      this.geocode();
    },
    _onRequestSuccess: function (response) {
      this.data.set({ response: response.data });
      this._fireEvent('requestsuccess');

      return response.data;
    },
    _onRequestFail: function (err) {
      this.data.set({ error: err });
      this._fireEvent('requestfail');

      throw err;
    },
    _fireEvent: function (name) {
      this.events.fire(name, {
        target: this
      });
    }
  });

  provide(GeocodeModel);
});
