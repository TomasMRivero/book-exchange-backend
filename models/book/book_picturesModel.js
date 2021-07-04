const connectDatabase = require("../../db")

const db = connectDatabase();
const qy = db.query

async function uploadPicture(setParams){
    console.log("picture")
    return await qy('INSERT INTO `book_pictures` SET ?', [ setParams ])
}
async function getBookPictures(id){
    return await qy('SELECT * FROM `book_pictures` WHERE `book_id` = ?', [id])
}

module.exports = {
uploadPicture,
getBookPictures
}