var BusinessInfoController = require('./../controller/BusinessInfoController.js');
var BusinessReviewController = require('./../controller/BusinessReviewController.js');
var BusinessDetailController = require('./../controller/BusinessDetailController.js');
var YelpController = require('./../controller/YelpController.js');

module.exports = function (app) {
  app.get('/api/business/info', BusinessInfoController.getInfo);

  app.get('/api/business/review', BusinessReviewController.getRating);
  app.post('/api/business/review', BusinessReviewController.addRating);

  app.get('/api/business/detail', BusinessDetailController.getDetails);

  app.post('/api/business/yelp', YelpController.queryYelp)
};

