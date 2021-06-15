const service = require("../services/book/bookService");

async function showBookList(){
    return await service.showBookList();
}

async function showBookById(id){
    return await service.showBookById(id);
}

async function createBook(params){
    const setParams = await service.verifySetParams(params);

    return await service.createBook(setParams);
}

module.exports = {
    showBookList,
    showBookById,
    createBook
}