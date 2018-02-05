const DB_NAME = 'babel'
var mongoose = require('mongoose');
var dbconnection = function() {

  var mongoDB = 'mongodb://127.0.0.1:27017/' + DB_NAME;
  mongoose.connect(mongoDB, {
    useMongoClient: true
  });
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

  return db;
}

module.exports = dbconnection;
