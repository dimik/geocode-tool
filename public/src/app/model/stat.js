ym.modules.define('stat-model', [
  'util.defineClass',
  'util.extend',
  'event.Manager',
  'data.Manager',
  'component.xhr',
  'app-config'
], function (provide, defineClass, extend, EventManager, DataManager, XHR, config) {
  /**
   * Stat Model Class.
   * @class
   * @name StatModel
   */
  var StatModel = defineClass(function (options) {
    this.events = new EventManager({ context: this });
    this.data = new DataManager();
  }, {
    load: function () {
      this._fireEvent('requestsend');
      return new XHR(config.stat.url)
        .then(
          this._onRequestSuccess,
          this._onRequestFail,
          this
        );
    },
    _onRequestSuccess: function (response) {
      this.data.set(response.data);
      this._fireEvent('requestsuccess');

      return response;
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

  provide(StatModel);
});
