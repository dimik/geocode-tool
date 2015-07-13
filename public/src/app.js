ym.modules.define('app', [
  'util.defineClass',
  'util.extend',
  'app-map-view',
  'app-dom-view',
  'geocode-model-factory',
  'app-config'
], function (provide, defineClass, extend, MapView, DomView, modelFactory, config) {
  var App = defineClass(function () {
    this._mapView = new MapView(config.map);
    this._domView = new DomView(config.ui);
    this._setupListeners();
  }, {
    init: function () {
      var stub = config.model.stub;

      this._createModel(stub.dataType, stub);

      this._domView
        .setInboxPlaceholder(stub.data)
        .setDelimPlaceholder(stub.delim);

      this._geocodeModelData();
    },
    _geocodeModelData: function () {
      this._geocodeModel.geocode().then(this._onDataLoad, this);
    },
    _setupListeners: function () {
      this._domView.events.add('formsubmit', this._onFormSubmit, this);
    },
    _clearListeners: function () {
    },
    _onFormSubmit: function (e) {
      var model = this._geocodeModel;
      var fields = e.get('fields');

      if(model.getDataType() === fields.dataType) {
        if(model.getData() === fields.inbox) {
          return;
        }
        model
          .clear()
          .setData(fields.inbox);
      }
      else {
        this
          ._removeModel()
          ._createModel(fields.dataType, extend({ data: fields.inbox }, fields));
      }
      this._geocodeModelData();
    },
    _createModel: function (dataType, options) {
      this._geocodeModel = modelFactory.create(
        dataType,
        extend({ provider: config.model.source }, options)
      );

      return this;
    },
    _removeModel: function () {
      this._geocodeModel.clear();
      this._geocodeModel = null;

      return this;
    },
    _onDataLoad: function (data) {
      this._mapView
        .clear()
        .render(data.result);
    }
  });

  provide(App);
});
