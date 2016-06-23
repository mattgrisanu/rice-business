var db = require('./../config/db.js');

db.knex.schema.hasTable('BusinessInfo').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('BusinessInfo', function(business) {
      business.increments('id').primary();
      business.string('business_id', 255).unique();
      business.string('name', 255);
      business.string('address', 255);
      business.string('phone', 255);
      business.string('city', 255);
      business.string('state', 255);
      business.string('latitude', 255);
      business.string('longitude', 255);
      business.float('rating')
      business.integer('review_count');
      business.string('is_closed', 255);
      business.timestamps();
    }).then(function (table) {
      console.log('Created "BusinessInfo" Table', table);
    });
  }
});

var BusinessInfo = db.Model.extend({
  tableName: 'BusinessInfo',
  hasTimestamps: true,
  defaults: {
    review_count: 0
  }
});

module.exports = BusinessInfo;
