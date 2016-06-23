var db = require('./../config/db.js');

db.knex.schema.hasTable('BusinessDetails').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('BusinessDetails', function(business) {
      business.increments('id').primary();
      business.string('business_id', 255);
      business.string('type', 255);
      business.string('value', 255);
      business.timestamps();
    }).then(function (table) {
      console.log('Created "BusinessDetails" Table', table);
    });
  }
});

var BusinessDetail = db.Model.extend({
  tableName: 'BusinessDetails',
  hasTimestamps: true
});

module.exports = BusinessDetail;
