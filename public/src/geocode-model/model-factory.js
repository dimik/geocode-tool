ym.modules.define('geocode-model-factory', [
  'csv-geocode-model',
  'geojson-geocode-model'
], function (provide, CSVGeocodeModel, GeoJSONGeocodeModel) {
  provide({
    create: function (dataType, data, options) {
      switch(dataType) {
        case 'CSV':
          return new CSVGeocodeModel(data, options);
        case 'GeoJSON':
          return new GeoJSONGeocodeModel(data, options);
        default:
          throw new TypeError('Unknown DataType');
      }
    }
  });
});
