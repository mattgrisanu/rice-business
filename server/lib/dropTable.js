// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './server/env/development.env' });
} else if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: './server/env/production.env' });
}

var db = require('./../config/db.js');

var dropTable = function (tableNames, count) {
  if (count === tableNames.length) {
    return;
  }

  return db.knex.schema.dropTable(tableNames[count])
    .then(function (tb) {
      console.log('Dropped ', tableNames[count], ' Table', tb);
      return dropTable(tableNames, ++count);
    })
    .catch(function (err) {
      console.error('Error: Dropping ', tableNames[count], ' Table Failed', err);
    })
}

module.exports = {
  dropTable: dropTable,
  db: db
}