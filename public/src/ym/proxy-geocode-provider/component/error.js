ym.modules.define('component.error', [
], function (provide) {
  provide(function (detail) {
    var err = new Error(detail.message);
    err.code = detail.code;

    return err;
  });
});
