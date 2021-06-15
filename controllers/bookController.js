const service = require("../services/book/bookService");

async function showBookList(){
    return await service.showBookList();
}

async function showBookById(id){
    return await service.showBookById(id);
}

async function showBookListByField(field, value){
    if (!value || !value.trim()){
        throw {code: "ERR_FALTAN_DATOS", mensaje: "faltan datos"}; //ERR_FALTAN_DATOS
    }
    return await service.showBookListByField(field, value);
}

async function createBook(params){
    const setParams = await service.verifySetParams(params);

    return await service.createBook(setParams);
}

module.exports = {
    showBookList,
    showBookListByField,
    showBookById,
    createBook
}