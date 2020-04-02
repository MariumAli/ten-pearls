var express = require('express');
var router = express.Router();
var trades = require('../controllers/trades');

const tradeController = new trades();
// Routes related to trades

router.post('/', function (req, res) {
    tradeController.addTrade(req, res);
});

router.get('/', function (req, res) {
    tradeController.getAllTrades(res);
})

router.get('/users/:id', function (req, res) {
    tradeController.getByUser(req, res);
});

router.get('/stocks/:symbol', function (req, res) {
    tradeController.getBySymbol(req, res);
});

router.get('/users/:id/stocks/:symbol', function (req, res) {
    tradeController.getByIdAndSymbol(req, res);
});



module.exports = router;