ym.modules.define('stat-dom-view', [
  'util.defineClass'
], function (provide, defineClass) {
  var StatDomView = defineClass(function () {
    this._stat = jQuery('#stat');
  }, {
    render: function (data) {
      var stat = this._stat;

      stat
        .find('#hit').text(data.hit);
      stat
        .find('#miss').text(data.miss);
    },
    clear: function () {
      var stat = this._stat;

      stat
        .find('#hit').text('0');
      stat
        .find('#miss').text('0');
    }
  });

  provide(StatDomView);
});
