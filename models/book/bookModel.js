const connectDatabase = require("../../db")

const db = connectDatabase();
const qy = db.query

async function getBookList(){
    return await qy('SELECT * FROM `book`');
}

async function getBookType(id){
    return await qy('SELECT * FROM `book_type` WHERE id=?', [id])
}

async function getBookById(id){
    return await qy('SELECT * FROM `book` WHERE id = ?', [id]);
}

async function getBookListByField(field, value){
    return await qy('SELECT * FROM `book` WHERE ?? LIKE ?', [field, ('%' + value + '%')]);
}

async function newBook(setParams){
    console.log(setParams);
    return await qy('INSERT INTO `book` SET ?', [ setParams ] );
}

async function uploadPicture(setParams){
    console.log(setParams)
    return await qy('INSERT INTO `book_pictures` SET ?', [ setParams ])
}

async function updateBook(setParams, searchParams){
    return await qy('UPDATE `book` SET ? WHERE ?', [ setParams, searchParams ] );
}

async function deleteBook(id){
    return await qy('DELETE FROM `book` WHERE id=?', [id]);
}


module.exports = {
    newBook,
    getBookList,
    getBookById,
    getBookListByField,
    updateBook,
    deleteBook,
    getBookType,
    uploadPicture
}