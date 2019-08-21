const mysql = require('mysql');

var connection = mysql.createConnection({
    host      : 'localhost',
    user      : 'root',
    password  : '',
    database  : 'db_name',
    debug     :  false
});

connection.connect(function(err){
  if (!err) {
      console.log(`[${new Date()}] Berhasil terkoneksi dengan database.`);
  } else {
      console.log(`[${new Date()}] Ada yang bermasalah | ${err}`);
  }
});

module.exports = connection; 