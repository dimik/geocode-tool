var express = require('express');
var router = express.Router();

var config = require('../config');
var MultiGeocoder = require('multi-geocoder');
var CacheStat = require('../lib/cache-stat');
var DailyCacheStat = require('../lib/daily-cache-stat');
var geocoder = new MultiGeocoder({ provider: 'yandex-cache', coordorder: 'latlong' });
var provider = geocoder.getProvider();
var reqStat = new CacheStat(provider);
var dailyStat = new DailyCacheStat(provider);

provider.getText = function (point) {
  return point.request;
};

router.route('/')
  .post(geocode);

router.route('/stat')
  .get(getStat)

function geocode(req, res, next) {
  var inbox = req.body.slice(0, config.get('limit:request'));

  if(dailyStat.get().miss > config.get('limit:daily')) {
    return res.status(429).json({
      message: 'Too Many Requests'
    });
  }

  reqStat.reset();

  geocoder.geocode(inbox)
    .then(function (data) {
      data.stat = reqStat.get();
      dailyStat.update(data.stat);
      res.status(200).json(data);
    });
}

function getStat(req, res, next) {
  res.status(200).json(dailyStat.get());
}

module.exports = router;
