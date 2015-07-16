ym.modules.define('component.querystring', [
], function (provide) {
  provide({
    parse: function (s) {
      var params = {};

      try {
        if(s.indexOf('?') > -1) {
          s = s.split('?')[1];
        }

        s.replace(/[^?&]+(?=&|$)/g, function (s) {
          var param = s.split('=');

          params[decodeURI(param[0])] = decodeURIComponent(param[1]);
        });
      }
      catch (e) {}

      return params;
    },
    stringify: function (data) {
      var params = [];

      try {
        for(var param in data) {
          params.push(encodeURI(param) + '=' + encodeURIComponent(data[param]));
        }
      }
      catch (e) {}

      return params.join('&');
    }
  });
});
