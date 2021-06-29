const { ERR_INPUT__MISSING_DATA } = require("../errorHandlers");
const service = require("../services/book/bookService");

async function showBookList(){
    return await service.showBookList();
}

async function showBookById(id){
    return await service.showBookById(id);
}

async function showBookListByField(field, value){
    if (!value || !value.trim()){
        throw ERR_INPUT__MISSING_DATA
    }
    return await service.showBookListByField(field, value);
}

async function createBook(params){
    const setParams = await service.verifySetParams(params);

    return await service.createBook(setParams);
}

async function updateBook(params){
    const{
        user,
        book,
        newValues
    } = params

    if(book.user_account_id != user){
        throw new Error('Flashaste compa')
    }
    const setParams = await service.verifyNewValues(newValues, book);
    const searchParams = {
        id: book.id
    }
    await service.updateBook(setParams, searchParams)
    return setParams
}

module.exports = {
    showBookList,
    showBookListByField,
    showBookById,
    createBook,
    updateBook
}