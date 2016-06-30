var dropTable = require('./dropTable.js');
var droptable = dropTable.dropTable;
var db = dropTable.db;

/**
* Make sure your children foriegn key tables are dropped first
* In ordering tableNames => make sure children foreign key tables
* are before its parent foreign key tables
*/
var tableNames = ['BusinessInfo', 'BusinessDetails'];

droptable(tableNames, 0);
