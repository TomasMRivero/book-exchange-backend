const connectDatabase = require("../../db")

const db = connectDatabase();
const qy = db.query

async function getBookType(id){
    return await qy('SELECT * FROM `book_type` WHERE id=?', [id])
}

async function getBookTypeList(){
    return await qy('SELECT * FROM `book_type`')
}

module.exports = {
    getBookType,
    getBookTypeList
}