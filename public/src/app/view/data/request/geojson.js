ym.modules.define('geojson-request-data-view', [
  'util.defineClass'
], function (provide, defineClass) {
  var GeoJSONRequestDataView = defineClass(function (params) {
    this._data = (params.request || '').trim();
  }, {
    each: function (fn, ctx) {
      try {
        var data = JSON.parse(this._data);
      }
      catch(e) {
        return;
      }

      (data.features || data).forEach(function (feature) {
        fn.call(ctx, feature.geometry.coordinates.join());
      });
    },
    valueOf: function () {
      return this._data;
    }
  });

  provide(GeoJSONRequestDataView);
});
