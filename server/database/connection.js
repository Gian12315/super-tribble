const { Sequelize  } = require('sequelize');
const sequelize = new Sequelize('moodle', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb'
})

exports.sequelize = sequelize
