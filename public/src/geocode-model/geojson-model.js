ym.modules.define('geojson-geocode-model', [
  'util.defineClass',
  'base-geocode-model'
], function (provide, defineClass, BaseModel) {
  var GeoJSONGeocodeModel = defineClass(function (options) {
    GeoJSONGeocodeModel.superclass.constructor.call(this, options);
  }, BaseModel, {
    each: function (fn) {
      var data = this._data.trim();
      if(data[0] === '[') {
        data = JSON.parse(data);
      }
      else {
        data = JSON.parse('[' + data + ']');
        if(data.length === 1 && Array.isArray(data[0].features)) {
          data = data[0].features;
        }
      }
      data.forEach(function (it, index) {
        fn.call(this, { request: it.geometry.coordinates }, index);
      }, this);

      return this;
    },
    getDataType: function () {
      return 'GeoJSON';
    }
  });

  provide(GeoJSONGeocodeModel);
});
