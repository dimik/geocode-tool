ym.modules.define('app', [
  'util.defineClass',
  'util.extend',
  'objects-map-view',
  'form-dom-view',
  'geocode-model',
  'csv-request-data-view',
  'geojson-request-data-view',
  'proxy-geocode-provider',
  'stat-model',
  'stat-dom-view',
  'preloader-dom-view',
  'error-dom-view',
  'app-config'
], function (
  provide,
  defineClass,
  extend,
  ObjectsMapView,
  FormDomView,
  GeocodeModel,
  CSVRequestDataView,
  GeoJSONRequestDataView,
  ProxyGeocodeProvider,
  StatModel,
  StatDomView,
  PreloaderDomView,
  ErrorDomView,
  config
) {
  var App = defineClass(function () {
    this._mapView = new ObjectsMapView(config.map);
    this._formView = new FormDomView(config.ui);
    this._geocodeModel = new GeocodeModel({
      provider: new ProxyGeocodeProvider(config.geocodeProvider)
    });
    this._statModel = new StatModel();
    this._statView = new StatDomView();
    this._preloaderView = new PreloaderDomView();
    this._errorView = new ErrorDomView();
    this._setupListeners();
    this._statModel.load();
  }, {
    _setupListeners: function () {
      this._formView.events
        .add('formsubmit', this._onFormSubmit, this)
        .add('formreset', this._onFormReset, this);
      this._geocodeModel.events
        .add('requestsend', this._onGeocodeRequestSend, this)
        .add('requestfail', this._onGeocodeRequestFail, this)
        .add('requestsuccess', this._onGeocodeRequestSuccess, this);
      this._statModel.events.add('requestsuccess', this._onStatRequestSuccess, this);
    },
    _clearListeners: function () {
    },
    _onFormSubmit: function (e) {
      this._geocodeModel.data.set('request', this._formView.getRequestData());
    },
    _onFormReset: function (e) {
      this._mapView.clear();
    },
    _onStatRequestSuccess: function (e) {
      this._statView.render(this._statModel.data.getAll());
    },
    _onGeocodeRequestSend: function (e) {
      this._preloaderView.render();
    },
    _onGeocodeRequestSuccess: function () {
      var response = this._geocodeModel.data.get('response.result');

      this._preloaderView.clear();
      this._mapView
        .clear()
        .render(response);
      this._formView
        .clear()
        .render(response);
      this._statModel.load();
    },
    _onGeocodeRequestFail: function (e) {
      this._preloaderView.clear();
      this._errorView.render(this._geocodeModel.data.get('error'));
    }
  });

  provide(App);
});
