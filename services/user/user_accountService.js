const model = require("../../models/user/user_accountModel");

async function showUserList(){
    return await model.getUserList();
}

async function showUserById(id){
    const user = await model.getUserById(id)
    if (user.length === 0){
        throw {code: "ERR_USUARIO_NO_ENCONTRADO", mensaje: "usuario no encontrado"}; //ERR_LIBRO_NO_ENCONTRADO
    }
    return user[0];
}

async function verifySetParams(params){
    
    const {
        mail,
        gender_id,
        alias,
        name
    } = params;

    if (
        !mail || !mail.trim() ||
        !gender_id ||
        !alias || !alias.trim() ||
        !name || !name.trim() 
    ){
        throw {code: "ERR_FALTAN_DATOS" , mensaje: "faltan datos"}; //ERR_FALTAN_DATOS
    }

    const genderExists =  await model.getGenderById(gender_id);
    if (genderExists.length === 0){
        throw {code: "ERR_GENERO_INVALIDO", mensaje: "genero no válido"}; //ERR_GENERO_INVALIDO
    }

    return {
        mail: mail.trim().toLowerCase(),
        gender_id: gender_id,
        alias: alias.trim().toUpperCase(),
        name: name.trim()
    };

}

async function verifyExistingUser(searchParams){

    for (const field in searchParams){
        exists = await model.getUserByField(field, searchParams[field]);
        if (exists.length !== 0){
            throw { code: 'ERR_YA_EXISTE', mensaje: `Ya existe un usuario con ese ${field}` }; //ERR_YA_EXISTE
        }
    }

}

async function registerUser(setParams){
    return await model.newUser(setParams)
}


module.exports = {
    showUserList,
    showUserById,
    verifySetParams,
    verifyExistingUser,
    registerUser
}