var BusinessInfoController = require('./../controller/BusinessInfoController.js');
var BusinessReviewController = require('./../controller/BusinessReviewController.js');
var BusinessDetailController = require('./../controller/BusinessDetailController.js');

module.exports = function (app) {
  app.get('/api/business/info', BusinessInfoController.getInfo);
  app.post('/api/business/info', BusinessInfoController.addBusiness);

  app.get('/api/business/review', BusinessReviewController.getRating);
  app.post('/api/business/review', BusinessReviewController.addRating);

  app.get('/api/business/detail', BusinessDetailController.getDetails);
};

