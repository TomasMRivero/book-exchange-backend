const model = require("../../models/book/bookModel");
const {getUserById} = require("../../models/user/user_accountModel");

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
        throw {code: "ERR_FALTAN_DATOS" , mensaje: "faltan datos"}; //ERR_FALTAN_DATOS
    }

    const userExists =  await getUserById(user_account_id);
    if (userExists.length === 0){
        throw {code: "ERR_USUARIO_NO_ENCONTRADO", mensaje: "usuario no encontrado"}; //ERR_USUARIO_NO_ENCONTRADO
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
    verifySetParams,
    createBook
}