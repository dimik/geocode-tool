ym.modules.define('csv-request-data-view', [
  'util.defineClass'
], function (provide, defineClass) {
  var CSVRequestDataView = defineClass(function (params) {
    this._data = (params.request || '').trim();
    this._delim = params.delim || '~';
  }, {
    each: function (fn, ctx) {
      var data = this._data;
      var delim = this._delim;
      var dlen = delim.length;
      var lastIndex = 0;
      var index = data.indexOf(delim);

      do {
        index - lastIndex > dlen && fn.call(ctx, data.slice(lastIndex + dlen, index));
        lastIndex = index;
      }
      while((index = data.indexOf(delim, index + dlen)) > -1)
      lastIndex + dlen < data.length && fn.call(ctx, data.slice(lastIndex + dlen));
    },
    valueOf: function () {
      return this._data;
    }
  });

  provide(CSVRequestDataView);
});
