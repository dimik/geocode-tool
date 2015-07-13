ym.modules.define('proxy-geocode-provider', [
  'util.defineClass',
  'util.extend',
  'vow',
  'component.xhr'
], function (provide, defineClass, extend, vow, XHR) {

  var config = { timeout: 10 };
  var requests = [];
  var defer = vow.defer();
  var timer;

  function cleanUp() {
    timer = null;
    requests.length = 0;
    defer = vow.defer();
  }

  function sendRequest() {
    var xhr = new XHR(config.url, {
      method: config.method,
      data: requests
    }).then(
      defer.resolve,
      defer.reject,
      defer.notify,
      defer
    );
    cleanUp();
  }

  function normalizeOptions(options) {
    if(options == null || Object.keys(options) == 'provider') {
      return;
    }

    return {
      boundedBy: options.boundedBy,
      strictBounds: options.strictBounds
    };
  }

  var ProxyGeocodeProvider = defineClass(function (options) {
    extend(config, options);
  }, {
    geocode: function (request, options) {
      requests.push({ request: request, options: normalizeOptions(options) });
      clearTimeout(timer);
      timer = setTimeout(sendRequest, config.timeout);

      return defer.promise();
    }
  });

  provide(ProxyGeocodeProvider);
});
