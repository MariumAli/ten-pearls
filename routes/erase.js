var express = require('express');
var router = express.Router();
var trades = require('../controllers/trades');

const tradeController = new trades()
// Route to delete all trades
router.delete('/', function (req, res) {
    tradeController.deleteTrades(req, res);
});
module.exports = router;