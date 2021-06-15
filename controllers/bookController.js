const service = require("../services/book/bookService");

async function createBook(params){
    const setParams = await service.verifySetParams(params);

    return await service.createBook(setParams);
}

module.exports = {
    createBook
}