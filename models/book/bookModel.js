const connectDatabase = require("../../db")

const db = connectDatabase();
const qy = db.query

async function newBook(setParams){
    return await qy('INSERT INTO `book` SET ?', [ setParams ] );
}


module.exports = {
    newBook
}