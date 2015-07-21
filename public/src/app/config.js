ym.modules.define('app-config', [
], function (provide) {
  provide({
    map: {
      container: 'ymap',
      state: {
        center: [55.751574, 37.573856],
        zoom: 9,
        controls: ['zoomControl', 'geolocationControl', 'typeSelector', 'fullscreenControl']
      },
      options: {
        suppressMapOpenBlock: true
      }
    },
    stat: {
      url: 'http://localhost:8887/geocode-tool/api/v1/stat/',
      method: 'GET'
    },
    geocodeProvider: {
      url: 'http://localhost:8887/geocode-tool/api/v1/geocode',
      method: 'POST'
    },
    form: {
      CSV: {
        request: {
          label: 'Адреса или координаты через разделитель',
          placeholder: 'Москва~Санкт-Петербург~Новосибирск~Екатеринбург~Нижний Новгород~Казань~Челябинск~Омск~Самара~Ростов-на-Дону~Уфа~Красноярск~Пермь~Воронеж~Волгоград'
        },
        delim: {
          placeholder: '~'
        }
      },
      GeoJSON: {
        request: {
          label: 'Координаты в формате GeoJSON',
          placeholder: '{"type":"FeatureCollection","features":[\n\t{"type":"Feature","geometry":{"type":"Point","coordinates":[55.75396,37.620393]}},\n\t{"type":"Feature","geometry":{"type":"Point","coordinates":[59.939095,30.315868]}},\n\t{"type":"Feature","geometry":{"type":"Point","coordinates":[55.030199,82.92043]}}\n]}',
        }
      }
    }
  });
});
