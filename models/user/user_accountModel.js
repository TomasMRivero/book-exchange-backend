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
    return await qy('SELECT `id`, `mail`, `gender_id`, `alias`, `name` FROM `user_account`');
}

async function getUserById(id){
    return await qy('SELECT `id`, `mail`, `gender_id`, `alias`, `name` FROM `user_account` WHERE id = ?', [ id ]);
}

async function getUserByField(field, value){
    return await qy('SELECT `id`, `mail`, `gender_id`, `alias`, `name` FROM `user_account` WHERE ?? = ?', [ field, value ]);
}

async function blacklistToken(setParams){
    return await qy('INSERT INTO `token_blacklist` SET ?', [setParams] );
}

async function searchToken(token){
    return await qy('SELECT * FROM `token_blacklist` where token=?', [token]);
}

async function getUserForAuth(field, value){
    return await qy('SELECT * FROM `user_account` WHERE ?? = ?', [ field, value ]);
}

async function updateUser(setParams, searchParams){
    return await qy('UPDATE `user_account` SET ? WHERE ?', [setParams, searchParams]);
}


module.exports = {
    getGenderList,
    getGenderById,
    newUser,
    getUserList,
    getUserByField,
    getUserById,
    blacklistToken,
    searchToken,
    getUserForAuth,
    updateUser
}