require('dotenv').config();
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 30,
    min: 10,
    idle: 10000
  },
  define: {
    timestamps: false
  }

})

module.exports = sequelize