var express = require('express');
var router = express.Router();
var trades = require('../controllers/trades');

// Route to delete all trades
router.delete('/', trades.deleteTrades);
module.exports = router;