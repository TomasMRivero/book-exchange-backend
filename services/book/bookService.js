const { ERR_BOOK__NOT_FOUND, ERR_INPUT__MISSING_DATA, ERR_USER__NOT_FOUND, ERR_AUTH__FORBIDDEN } = require("../../errorHandlers");
const model = require("../../models/book/bookModel");
const {getUserById} = require("../../models/user/user_accountModel");

async function showBookList(){
    return await model.getBookList();
}

async function showBookById(id){
    const book = await model.getBookById(id)
    if (book.length === 0){
        throw ERR_BOOK__NOT_FOUND;
    }
    return book[0];
}

async function showBookListByField(field, value){
    const list = await model.getBookListByField(field, value.trim().toUpperCase());
    return list.length > 0 ? list : [];
}

async function verifySetParams(params){
    
    const {
        user_account_id,
        title,
        author,
        book_type_id,
        description,
        book_condition,
        main_picture
    } = params;

    if (
        !user_account_id ||
        !title || !title.trim() ||
        !author || !author.trim() ||
        !book_type_id ||
        !book_condition ||
        !main_picture
    ){
        throw ERR_INPUT__MISSING_DATA;
    }

    const typeExists = await model.getBookType(book_type_id)
    if (typeExists.length < 1){
        throw {message: 'Tipo no válido'}
    }

    if (book_condition < 0 || book_condition > 5) {
        throw {message: 'Estado no válido'}
    }

    const userExists =  await getUserById(user_account_id);
    if (userExists.length === 0){
        throw ERR_USER__NOT_FOUND;
    }

    const picture_route = `uploads/book/${main_picture.filename}`
    
    params = {
        user_account_id: user_account_id,
        title: title.trim().toUpperCase(),
        author: author.trim().toUpperCase(),
        book_type_id: book_type_id,
        book_condition: book_condition,
        main_picture: picture_route
    }

    if(  !description || description == null || description == "" || description.trim() == ""){
        return {
            ...params,
            description: null
        };
    }

    return {
        ...params,
        description: description.trim()
    };

}

async function createBook(setParams){
    return await model.newBook(setParams);
}

async function verifyAuthorization(dbId, tokenId){    
    if(dbId !== tokenId){
        throw ERR_AUTH__FORBIDDEN
    }
}

async function verifyNewValues(params, book){

    const title = (() => {return (!params.title || !params.title.trim()?book.title:params.title.toUpperCase().trim())});
    const author = (() => {return (!params.author || !params.author.trim()?book.author:params.author.toUpperCase().trim())});
    const description = (() => {return (!params.description || !params.description.trim()?null:params.description.trim())});

    setParams = {
        title: title(),
        author: author(),
        description: description()
    };

    return setParams
}

async function updateBook(setParams, searchParams){
    return await model.updateBook(setParams, searchParams);
}

async function deleteBook(id){
    await model.deleteBook(id);
    return {message: "El libro se borró correctamente"};
}

module.exports = {
    showBookList,
    showBookListByField,
    showBookById,
    verifySetParams,
    createBook,
    verifyAuthorization,
    verifyNewValues,
    updateBook,
    deleteBook
}