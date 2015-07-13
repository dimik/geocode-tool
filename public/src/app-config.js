ym.modules.define('app-config', [
], function (provide) {
  provide({
    map: {
      container: 'ymap',
      state: {
        center: [55.751574, 37.573856],
        zoom: 9,
        controls: ['zoomControl', 'geolocationControl', 'typeSelector']
      },
      options: {
        suppressMapOpenBlock: true
      }
    },
    model: {
      stub: {
        dataType: 'CSV',
        data: 'Москва~Санкт-Петербург~Новосибирск~Екатеринбург~Нижний Новгород~Казань~Челябинск~Омск~Самара~Ростов-на-Дону~Уфа~Красноярск~Пермь~Воронеж~Волгоград',
        delim: '~'
      },
      source: {
        url: 'http://localhost:8888',
        method: 'POST'
      }
    }
  });
});
