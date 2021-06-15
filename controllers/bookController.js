const service = require("../services/book/bookService");

async function createBook(params){
    const setParams = await service.verifySetParams(params);



}

module.exports = {
    createBook
}