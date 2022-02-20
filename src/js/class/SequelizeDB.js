const { Sequelize, DataTypes } = require('sequelize');


/**
 * Use Sequelize to manage the database
 */
const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  });

  module.exports = database;