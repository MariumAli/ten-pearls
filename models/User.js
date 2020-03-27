const Sequelize = require('sequelize');
const sequelize = require('../services/sqlite');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: Sequelize.STRING,
});

module.exports = User;