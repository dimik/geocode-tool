ym.modules.define('preloader-dom-view', [
  'util.defineClass'
], function (provide, defineClass) {
  var PreloaderDomView = defineClass(function () {
    this._preloader = jQuery([
      '<div class="preloader alert alert-info">',
        '<p>Пожалуйста, подождите, идет поиск...</p>',
        '<div class="progress progress-striped active">',
          '<div class="bar" style="width: 100%;"></div>',
        '</div>',
      '</div>'
    ].join(''));
  }, {
    render: function () {
      jQuery('body').append(this._preloader);
    },
    clear: function () {
      this._preloader.remove();
    }
  });

  provide(PreloaderDomView);
});
