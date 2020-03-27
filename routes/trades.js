var express = require('express');
var router = express.Router();
var trades = require('../controllers/trades');

// Routes related to trades
router.get('/', trades.getAllTrades);
router.post('/', trades.addTrade);
router.get('/users/:id', trades.getByUser);
router.get('/stocks/:symbol', trades.getBySymbol);
router.get('/users/:id/stocks/:symbol', trades.getByIdAndSymbol);

module.exports = router;