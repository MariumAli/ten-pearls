/* Load Trade Data Access Object */
const TradeServices = require('../services/tradeServices');

/* Load Controller Common function */
const CommonController = require('./common/commonContoller');

/* Load Trade entity */
const Trade = require('../models/Trade');

/**
 * Trade Controller
 */
class trades {

    constructor() {
        this.tradeServices = new TradeServices();
        this.common = new CommonController();
    }

    /**
     * Tries to find Trades for a user
     * @params req, res
     * @return entity
     */
    getByUser(req, res) {
        let id = req.params.id;

        this.tradeServices.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Tries to find Trades for a user
     * @params req, res
     * @return entity
     */
    getBySymbol(req, res) {
        let symbol = req.params.symbol;

        this.tradeServices.findBySymbol(symbol)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Tries to find Trades for a user
     * @params req, res
     * @return entity
     */
    getByIdAndSymbol(req, res) {
        let id = req.params.id;
        let symbol = req.params.symbol;

        this.tradeServices.findByIdAndSymbol(id, symbol)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    getAllTrades(res) {
        this.tradeServices.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };
    
    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    addTrade(req, res) {
        let trade = new Trade();
        trade.id = req.body.id;
        trade.type = req.body.type;
        trade.user = req.body.user;
        trade.symbol = req.body.symbol;
        trade.shares = req.body.shares;
        trade.price = req.body.price;
        trade.timestamp = req.body.timestamp;

        return this.tradeServices.createWithId(trade)
            .then(this.common.editSuccess(res))
            .catch(this.common.conflictError(res));

    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteTrades(req, res) {
        this.tradeServices.deleteAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let id = req.params.id;

        this.tradeServices.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = trades;