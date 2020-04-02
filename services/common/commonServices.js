/* Load database & database configuration */
const database = require('../../config/dbconfig');

/* Load bluebird Promise */
const Promise = require('bluebird');

/* Load Error entity */
const ErrorService = require('./errorService');

/**
 * Common functions
 */
class CommonService {
    
    findAll(sqlRequest) {
        return new Promise(function (resolve, reject) {
            database.db.all(sqlRequest, function (err, rows) {
                if (err) {
                    reject(
                        new ErrorService(20, "Internal server error")
                    );
                } else if (rows === null || rows.length === 0) {
                    reject(
                        new ErrorService(21, "Entity not found")
                    );
                } else {
                    resolve(rows);
                }
            })
        });
    }

    run(sqlRequest, sqlParams) {
        return new Promise(function (resolve, reject) {
            let stmt = database.db.prepare(sqlRequest);
            stmt.run(sqlParams, function (err) {
                if (this.changes === 1) {
                    resolve(true);
                } else if (this.changes === 0) {
                    reject(
                        new ErrorService(21, "Entity not found")
                    )
                } else {
                    console.log(err);
                    reject(
                        new ErrorService(11, "Invalid arguments")
                    )
                }
            })
        });
    }

    runWithoutParams(sqlRequest) {
        return new Promise(function (resolve, reject) {
            database.db.all(sqlRequest, function (err) {
                if (this.changes === 1) {
                    resolve(true);
                } else if (this.changes === 0) {
                    reject(
                        new ErrorService(21, "Entity not found")
                    )
                } else {
                    console.log(err);
                    reject(
                        new ErrorService(11, "Invalid arguments")
                    )
                }
            })
        });
    }
}

module.exports = CommonService;