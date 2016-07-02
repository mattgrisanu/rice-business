/**
* mySQL database for real data
*/
var connection = {
  client: 'mysql',
  connection: {
    host     : 'ricebusiness.cgjrw0qltvqr.us-west-2.rds.amazonaws.com',
    database: process.env.APP_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset  : 'utf8'
  },
  useNullAsDefault: true
};

var knex = require('knex')(connection);
module.exports = require('bookshelf')(knex);