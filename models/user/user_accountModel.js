const connectDatabase = require("../../db")

const db = connectDatabase();
const qy = db.query

async function getGenderList(){
    return await qy('SELECT * FROM `gender_list`');
}

async function getGenderById(id){
    return await qy('SELECT * FROM `gender_list` WHERE id = ?', [ id ]);
}

async function newUser(setParams){
    return await qy('INSERT INTO `user_account` SET ?', [ setParams ] );
}

async function getUserList(){
    return await qy('SELECT * FROM `user_account`');
}

async function getUserById(id){
    return await qy('SELECT * FROM `user_account` WHERE id = ?', [ id ]);
}

async function getUserByField(field, value){
    return await qy(`SELECT * FROM \`user_account\` WHERE ${field} = ?`, [ value ])
}

module.exports = {
    getGenderList,
    getGenderById,
    newUser,
    getUserList,
    getUserByField,
    getUserById
}