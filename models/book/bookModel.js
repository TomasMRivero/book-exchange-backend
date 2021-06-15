const connectDatabase = require("../../db")

const db = connectDatabase();
const qy = db.query

async function getBookList(){
    return await qy('SELECT * FROM `book`');
}

async function getBookById(id){
    return await qy('SELECT * FROM `book` WHERE id = ?', [id]);
}

async function getBookListByField(field, value){
    return await qy(`SELECT * FROM \`book\` WHERE ${field} = ?`, [ value ]);
}

async function newBook(setParams){
    return await qy('INSERT INTO `book` SET ?', [ setParams ] );
}


module.exports = {
    newBook,
    getBookList,
    getBookById,
    getBookListByField
}