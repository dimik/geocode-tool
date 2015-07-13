ym.modules.define('csv-geocode-model', [
  'util.defineClass',
  'base-geocode-model'
], function (provide, defineClass, BaseModel) {
  var CSVGeocodeModel = defineClass(function (options) {
    CSVGeocodeModel.superclass.constructor.call(this, options);
    this._delim = options.delim
  }, BaseModel, {
    each: function (fn) {
      this._data.trim().split(this._delim).forEach(function (it, index) {
        fn.call(this, { request: it }, index);
      }, this);

      return this;
    },
    getDataType: function () {
      return 'CSV';
    }
  });

  provide(CSVGeocodeModel);
});
