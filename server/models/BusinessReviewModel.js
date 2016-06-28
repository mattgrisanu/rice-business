var db = require('./../config/db.js');

db.knex.schema.hasTable('BusinessReviews').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('BusinessReviews', function(business) {
      business.increments('id').primary();
      business.string('business_id', 255);
      business.string('user_id', 255);
      business.string('review', 255);
      business.float('rating')
      business.timestamps();
    }).then(function (table) {
      console.log('Created "BusinessReviews" Table', table);
    });
  }
});

var BusinessReview = db.Model.extend({
  tableName: 'BusinessReviews',
  hasTimestamps: true
});

module.exports = BusinessReview;
