ym.modules.define('app-map-view', [
  'util.defineClass',
  'Map',
  'ObjectManager',
  'templateLayoutFactory',
  'event.Manager'
], function (provide, defineClass, Map, ObjectManager, templateLayoutFactory, EventManager) {

  var MapView = defineClass(function (config) {
    this.events = new EventManager();
    this._map = new Map(config.container, config.state, config.options);
    this._objects = this._createObjectManager();
    this._map.geoObjects.add(this._objects);
  }, {
    render: function (data) {
      this._objects.add(data);
      this.focusOnObjects();

      return this;
    },
    clear: function () {
      this._objects.removeAll();

      return this;
    },
    _createObjectManager: function () {
      return new ObjectManager({
        geoObjectBalloonContentLayout: templateLayoutFactory.createClass([
          '<h3>{{ properties.name }}</h3>',
          '<p>{{ properties.description }}</p>'
        ].join(''))
      });
    },
    focusOnObjects: function () {
      this._map.setBounds(this._objects.getBounds(), {
        checkZoomRange: true,
        zoomMargin: 20
      });

    return this;
    },
    _setupListeners: function () {
    },
    _clearListeners: function () {
    },
  });

  provide(MapView);
});
