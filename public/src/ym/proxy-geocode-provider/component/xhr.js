ym.modules.define('component.xhr', [
  'vow',
  'component.querystring',
  'component.error'
], function (provide, vow, querystring, Error) {
  var XMLHttpRequest = window.XDomainRequest || window.XMLHttpRequest;
  var parseHeaders = function (headers) {
    return headers.split('\u000d\u000a').reduce(function (result, line) {
      var parts = line.split('\u003a\u0020');
      if(parts.length == 2) {
        result[parts[0].toLowerCase()] = parts[1].trim();
      }
      return result;
    }, {});
  };

  function XHR(url, options) {
    options = options || {};
    var defer = vow.defer();
    var xhr = new XMLHttpRequest();
    var data = options.data || null;
    var headers = options.headers || {};
    var method = (options.method || 'GET').toUpperCase();
    var timeout = options.timeout || 30000;

    function cleanUp() {
      xhr.onload = xhr.onerror = null;
    }

    if(!headers['X-Requested-With']) {
      headers['X-Requested-With'] = 'XMLHttpRequest';
    }

    if(data) {
      if(method === 'GET') {
        url += '?' + querystring.stringify(data);
      }
      /**
       * All objects will be sended as JSON string by default.
       * To send ArrayBufferView, Blob, Document and FormData use proper Content-Type header.
       */
      else if(typeof data === 'object' && !headers['Content-Type']) {
        data = JSON.stringify(data);
        headers['Content-Type'] = 'application/json';
      }
    }

    xhr.onload = function () {
      if(this.status >= 400) {
        return xhr.onerror();
      }

      var headers = this.getAllResponseHeaders();
      var cType = this.getResponseHeader('Content-Type') || 'text/plain';
      var response = cType.indexOf('xml') > -1 && this.responseXML || this.response || this.responseText;

      if(cType.indexOf('json') > -1 && typeof response === 'string') {
        try {
          response = JSON.parse(response);
        }
        catch(e) {
          return defer.reject(new Error({
            code: 500,
            message: 'JSON Parse Error ' + e.message
          }));
        }
      }

      cleanUp();
      defer.resolve({
        code: this.status,
        data: response,
        headers: !!options.parseResponseHeaders?
          parseHeaders(headers) : headers
      });
    };

    xhr.onerror = function () {
      defer.reject(new Error({
        code: this.status || 500,
        message: this.statusText || 'Internal Server Error'
      }));
    };

    xhr.open(method, url, true);

    Object.keys(headers).forEach(function (key) {
      xhr.setRequestHeader(key, headers[key]);
    });

    xhr.send(data);

    return defer.promise()
      .timeout(timeout)
      .fail(function (e) {
        cleanUp();
        if(e instanceof vow.TimedOutError) {
          xhr.abort();
          throw new Error({
            code: 408,
            message: 'Request Timeout'
          });
        }
        throw e;
      });
  }

  provide(XHR);
});
