const Sequelize = require('sequelize');
const db = new Sequelize('RestfulAPI-nodeJS', 'postgres', '1234"', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = db;