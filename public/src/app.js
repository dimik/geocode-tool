ym.modules.define('app', [
  'util.defineClass',
  'app-map-view',
  'app-dom-view',
  'geocode-model-factory',
  'app-config'
], function (provide, defineClass, MapView, DomView, modelFactory, config) {
  var App = defineClass(function () {
    this._mapView = new MapView(config.map);
    this._domView = new DomView(config.ui);
  }, {
    init: function () {
      var stub = config.model.stub;

      var model = this._createModel(stub.dataType, stub.data, {
        delim: stub.delim,
        provider: config.model.source
      });

      this._domView
        .setInboxPlaceholder(stub.data)
        .setDelimPlaceholder(stub.delim);

      model.geocode().then(this._onDataLoad, this);
    },
    _createModel: function (dataType, data, options) {
      return this._geocodeModel = modelFactory.create(dataType, data, options);
    },
    _removeModel: function () {
      this._geocodeModel.clear();
      this._geocodeModel = null;
    },
    _onDataLoad: function (data) {
      this._mapView
        .clear()
        .render(data.result);
    }
  });

  provide(App);
});
