ym.modules.define('geojson-form-state', [
  'util.defineClass',
  'geojson-request-data-view',
  'app-config'
], function (provide, defineClass, GeoJSONRequestDataView, config) {
  var GeoJSONFormState = defineClass(function (form) {
    this._form = form;
  }, {
    init: function () {
      var form = this._form;

      form.find('label[for=request]').text(config.form.GeoJSON.request.label);
      form.find('#request').attr('placeholder', config.form.GeoJSON.request.placeholder);
    },
    destroy: function () {
      var form = this._form;

      form.find('#delim')
        .hide()
        .removeAttr('placeholder')
        .attr('disabled','disabled');
    },
    getRequestDataView: function () {
      return new GeoJSONRequestDataView({
        request: this._form.find('#request').val()
      });
    }
  });

  provide(GeoJSONFormState);
});
