const { ERR_BOOK__NOT_FOUND, ERR_INPUT__MISSING_DATA, ERR_USER__NOT_FOUND } = require("../../errorHandlers");
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
        description
    } = params;

    if (
        !user_account_id ||
        !title || !title.trim() ||
        !author || !author.trim()
    ){
        throw ERR_INPUT__MISSING_DATA;
    }

    const userExists =  await getUserById(user_account_id);
    if (userExists.length === 0){
        throw ERR_USER__NOT_FOUND;
    }

    params = {
        user_account_id: user_account_id,
        title: title.trim().toUpperCase(),
        author: author.trim().toUpperCase(),
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

module.exports = {
    showBookList,
    showBookListByField,
    showBookById,
    verifySetParams,
    createBook
}