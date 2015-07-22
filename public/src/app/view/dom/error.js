ym.modules.define('error-dom-view', [
  'util.defineClass'
], function (provide, defineClass) {
  var ErrorDomView = defineClass(function () {
    this._alert = jQuery([
      '<div class="popup alert alert-error">',
        '<button type="button" class="close" data-dismiss="alert">×</button>',
        '<h4>Произошла ошибка</h4>',
        '<p id="message"></p>',
      '</div>'
    ].join(''));
  }, {
    render: function (error) {
      jQuery('body').append(this._alert);
      this._alert.find('#message').text(
        error instanceof Error? error.message : error
      );
    },
    clear: function () {
      this._alert.remove();
    }
  });

  provide(ErrorDomView);
});
