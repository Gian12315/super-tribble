require("dotenv").config();
const { Sequelize  } = require('sequelize');

const dbDialect = process.env.DB_DIALECT;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect:  dbDialect
})

exports.sequelize = sequelize
