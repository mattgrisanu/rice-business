// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './server/env/development.env' });
} else if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '../env/production.env' });
  // require('dotenv').config({ path: './server/env/production.env' });
}

var express = require('express');
var app = express();

require('./config/initialize.js')(app, express);

require('./routes/api-routes.js')(app);

app.listen(3002, function() {
  console.log('NODE_ENV: ' + process.env.NODE_ENV);
  console.log(process.env.APP_NAME + ' is listening at ' + process.env.HOST + ' on port ' + process.env.PORT + '.')
});

module.exports = app;
