const connectDatabase = require("../../db")

const db = connectDatabase();
const qy = db.query

async function getGenderList(){
    return await qy('SELECT * FROM `gender_list`');
}

async function getGenderById(id){
    return await qy('SELECT * FROM `gender_list` WHERE id = ?', [ id ])
}

async function newUser(setParams){
    return await qy('INSERT INTO `user_account` SET ?', [ setParams ] )    
}

module.exports = {
    getGenderList,
    getGenderById,
    newUser
}