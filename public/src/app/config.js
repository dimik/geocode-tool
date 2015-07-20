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
    geocodeProvider: {
      url: 'http://localhost:8888/api/geocode/v1/',
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
          placeholder: '[{ "geometry": { "type": "Point", coordinates: [55.7, 37.5] }}, { "geometry": { "type": "Point", coordinates: [55.7, 37.5] }}]',
        }
      }
    }
  });
});
