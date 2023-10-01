const { Sequelize  } = require('sequelize');

const dbDialect = process.env.DB_DIALECT || "mysql";
const dbHost = process.env.DB_HOST || "localhost";
const dbName = process.env.DB_NAME || "moodle";
const dbUser = process.env.DB_USER || "root";
const dbPass = process.env.DB_PASS || "12345";

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect:  dbDialect
})

exports.sequelize = sequelize
