ym.modules.define('form-dom-view', [
  'util.defineClass',
  'event.Manager',
  'csv-form-state',
  'geojson-form-state'
], function (provide, defineClass, EventManager, CSVFormState, GeoJSONFormState) {

  var FormDomView = defineClass(function (config) {
    this.events = new EventManager();
    this._form = jQuery('form');
    this._setupListeners();
    this._setState(CSVFormState);
  }, {
    getRequestData: function () {
      return this._state.getRequestDataView();
    },
    _setState: function (State) {
      if(this._state) {
        this._state.destroy();
      }
      this._state = new State(this._form);
      this._state.init();
    },
    _setupListeners: function () {
      this._form
        .on('change', 'select#dataType', jQuery.proxy(this._onDataTypeChange, this))
        .on('submit', jQuery.proxy(this._onFormSubmit, this))
        .on('reset', jQuery.proxy(this._onFormReset, this));
    },
    _clearListeners: function () {
      this._form.off();
    },
    _onDataTypeChange: function (e) {
      e.preventDefault();

      var dataType = jQuery(e.target).val();

      switch(dataType) {
        case 'CSV':
          this._setState(CSVFormState);
          break;
        case 'GeoJSON':
          this._setState(GeoJSONFormState);
          break;
        default:
          throw new TypeError('Data Type ' + dataType + ' not supported');
      }
    },
    _onFormSubmit: function (e) {
      e.preventDefault();

      this.events.fire('formsubmit', { target: this });
    },
    _onFormReset: function (e) {
      this.events.fire('formreset', { target: this });
    }
  });

  provide(FormDomView);
});
