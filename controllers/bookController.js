const { ERR_INPUT__MISSING_DATA, ERR_AUTH__FORBIDDEN } = require("../errorHandlers");
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

async function uploadBookPictures(pictureParams){
    await service.uploadBookPictures(pictureParams);
};

async function updateBook(params){
    const{
        user,
        book,
        newValues
    } = params;

    await service.verifyAuthorization(book.user_account_id, user);

    const setParams = await service.verifyNewValues(newValues, book);
    const searchParams = {
        id: book.id
    }
    await service.updateBook(setParams, searchParams);
    return setParams;
}

async function deleteBook(params){
    const{
        book_id,
        user_id
    } = params;
    const book = await service.showBookById(book_id);
    await service.verifyAuthorization(book.user_account_id, user_id);
    return await service.deleteBook(book_id);
} 

module.exports = {
    showBookList,
    showBookListByField,
    showBookById,
    createBook,
    updateBook,
    deleteBook,
    uploadBookPictures
}