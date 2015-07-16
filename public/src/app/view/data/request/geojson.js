ym.modules.define('geojson-request-data-view', [
  'util.defineClass'
], function (provide, defineClass) {
  var GeoJSONRequestDataView = defineClass(function (data) {
    this._data = (data || '').trim();
  }, {
    each: function (fn, ctx) {
      var data = JSON.parse(data);

      data.forEach(fn, ctx);
    },
    valueOf: function () {
      return this._data;
    }
  });

  provide(GeoJSONRequestDataView);
});
