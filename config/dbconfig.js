/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */


let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    
    console.log('Connected to the in-memory SQlite database.');
    db.run("CREATE TABLE if not exists trade (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    " type TEXT," +
    " symbol TEXT," +
    " shares INT," +
    " price REAL," +
    " timestamp TEXT," +
    " userId INT" +
    ")");
    
    db.run("CREATE TABLE if not exists user (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    " name TEXT" +
    ")");
});

db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
