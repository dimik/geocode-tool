ym.modules.define('csv-request-data-view', [
  'util.defineClass'
], function (provide, defineClass) {
  var CSVRequestDataView = defineClass(function (params) {
    this._data = (params.request || '').trim();
    this._delim = params.delim || '~';
  }, {
    each: function (fn, ctx) {
      this._data.split(this._delim)
        filter(function (it) {
          return it.length > 0;
        }).forEach(fn, ctx);
    },
    valueOf: function () {
      return this._data;
    }
  });

  provide(CSVRequestDataView);
});
