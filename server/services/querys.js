const { QueryTypes } = require('sequelize');
const { sequelize } = require('../database/connection');
 
const getUserPicture= async ({ email }) => {
    const res = await sequelize.query(`SELECT picture FROM mdl_user WHERE email like ?`, {
        replacements: [email],
        type: QueryTypes.SELECT
    });
    return res[0]?.picture;
}

const getUserId = async ({ email }) => {
    const res = await sequelize.query('SELECT id FROM mdl_user WHERE email like ?', {
        replacements: [email],
        type: QueryTypes.SELECT
    })
    return res[0]?.id;
}

const getUserPassword = async({email}) => {
    const res = await sequelize.query('SELECT password FROM mdl_user WHERE email like ?', {
        type: QueryTypes.SELECT,
        replacements: [email]
    });
    return res[0]?.password;
}

exports.getUserPicture = getUserPicture;
exports.getUserId = getUserId;
exports.getUserPassword = getUserPassword;
