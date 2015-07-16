ym.modules.define('csv-form-state', [
  'util.defineClass',
  'csv-request-data-view',
  'app-config'
], function (provide, defineClass, CSVRequestDataView, config) {
  var CSVFormState = defineClass(function (form) {
    this._form = form;
  }, {
    init: function () {
      var form = this._form;

      form.find('#delim')
        .show()
        .attr('placeholder', config.form.CSV.delim.placeholder)
        .removeAttr('disabled');

      form.find('label[for=request]').text(config.form.CSV.request.label);
      form.find('#request').attr('placeholder', config.form.CSV.request.placeholder);
    },
    destroy: function () {
      var form = this._form;

      form.find('#delim')
        .removeAttr('placeholder')
        .hide()
        .attr('disabled','disabled');
    },
    getRequestDataView: function () {
      var form = this._form;

      return new CSVRequestDataView({
        request: form.find('#request').val(),
        delim: form.find('#delim').val()
      });
    }
  });

  provide(CSVFormState);
});
