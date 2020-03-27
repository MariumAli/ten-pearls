const Sequelize = require('sequelize');
const moment = require('moment');
const sequelize = require('../services/sqlite');
const User = require('./User');

const Trade = sequelize.define('trade', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  type: Sequelize.STRING,
  symbol: Sequelize.STRING,
  shares: Sequelize.NUMBER,
  price: Sequelize.NUMERIC,
  timestamp: {
    type: Sequelize.DATE,
    get() {
      const date = this.getDataValue('timestamp');
      return moment(date).format('yyyy-MM-dd HH:mm:ss');
    },
  },
});

Trade.belongsTo(User);
// For the User, avoid circular dependency
User.hasMany(Trade);

module.exports = Trade;