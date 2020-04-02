/* Load Trade entity */
const Trade = require('../models/Trade');

/* Load Common functions */
const commonServices = require('./common/commonServices');

/**
 * Trade Data Access Object
 */
class TradeServices {

    constructor() {
        this.commonService = new commonServices();
    }

    /**
     * Tries to find an entity using userId
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT t.id AS id, t.type AS type, t.symbol AS symbol, t.shares AS shares, t.price AS price, t.timestamp AS timestamp, " +
        "t.userId AS userId, u.name AS name FROM " +
         "trade t INNER JOIN user u ON t.userId = u.id WHERE t.userId=$id";
        let sqlParams = {$id: id};
        return this.commonService.findAll(sqlRequest, sqlParams).then(row => {
            new Trade(row.id, row.type, { id: userId, name: name }, row.symbol, row.shares, row.price, row.timestamp);
        })
    };

    /**
     * Tries to find an entity using trade symbol
     * @params symbol
     * @return entity
     */
    findBySymbol(symbol) {
        let sqlRequest = "SELECT t.id AS id, t.type AS type, t.symbol AS symbol, t.shares AS shares, t.price AS price, t.timestamp AS timestamp, " +
        "t.userId AS userId, u.name AS name FROM " +
        "trade t INNER JOIN user u ON t.userId = u.id WHERE t.symbol=$symbol";
        let sqlParams = {$symbol: symbol};
        return this.commonService.findAll(sqlRequest, sqlParams).then(row =>
            new Trade(row.id, row.type, { id: userId, name: name }, row.symbol, row.shares, row.price, row.timestamp));
    };

    /**
     * Tries to find an entity using trade symbol and userId
     * @params symbol
     * @return entity
     */
    findByIdAndSymbol(id, symbol) {
        let sqlRequest = "SELECT t.id AS id, t.type AS type, t.symbol AS symbol, t.shares AS shares, t.price AS price, t.timestamp AS timestamp, " +
        "t.userId AS userId, u.name AS name FROM " +
        "trade t INNER JOIN user u ON t.userId = u.id WHERE t.symbol=$symbol AND t.userId=$id";
        let sqlParams = {$id: id, $symbol: symbol};
        return this.commonService.findAll(sqlRequest, sqlParams).then(row =>
            new Trade(row.id, row.type, { id: userId, name: name }, row.symbol, row.shares, row.price, row.timestamp));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT t.id AS id, t.type AS type, t.symbol AS symbol, t.shares AS shares, t.price AS price, t.timestamp AS timestamp, " +
        "t.userId AS userId, u.name AS name FROM " +
        "trade t INNER JOIN user u ON t.userId = u.id";
        return this.commonService.findAll(sqlRequest).then(rows => {
            let trades = [];
            for (const row of rows) {
                trades.push(new Trade(row.id, row.type, { id: userId, name: name }, row.symbol, row.shares, row.price, row.timestamp));
            }
            return trades;
        });
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Trade
     * returns database insertion status
     */
    createWithId(Trade) {
        if (!existsUser(Trade.user.id)) {
            let sqlUserRequest = "INSERT into user (id, name) VALUES ($id, $name)";
            let sqlUserParams = {
                $id: Trade.user.id,
                $name: Trade.user.name
            };
            let result = this.commonService.run(sqlUserRequest, sqlUserParams);
        }

        let sqlRequest = "INSERT into trade (id, type, symbol, shares, price, timestamp, userId) " +
            "VALUES ($id, $type, $symbol, $shares, $price, $timestamp, $userId)";
        let sqlParams = {
            $id: Trade.id,
            $type: Trade.type,
            $symbol: Trade.symbol,
            $shares: Trade.shares,
            $price: Trade.price,
            $timestamp: Trade.timestamp,
            $userId: Trade.user.id
        };
        return this.commonService.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes all rows from databse
     * returns database deletion status
     */
    deleteAll() {
        let sqlRequest = "DELETE FROM trade";
        return this.commonService.runWithoutParams(sqlRequest);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    existsTrade(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM trade WHERE id=$id";
        let sqlParams = {$id: id};
        return this.commonService.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    existsUser(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM user WHERE id=$id";
        let sqlParams = {$id: id};
        return this.commonService.run(sqlRequest, sqlParams);
    };
}

module.exports = TradeServices;