ym.modules.define('csv-geocode-model', [
  'util.defineClass',
  'base-geocode-model'
], function (provide, defineClass, BaseModel) {
  var CSVGeocodeModel = defineClass(function (data, options) {
    CSVGeocodeModel.superclass.constructor.call(this, data, options);
  }, BaseModel, {
    each: function (fn) {
      this._data.trim().split(this._options.delim).forEach(function (it, index) {
        fn.call(this, { request: it }, index);
      }, this);
    }
  });

  provide(CSVGeocodeModel);
});
