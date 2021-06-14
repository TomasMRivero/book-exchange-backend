const model = require("../../models/user/user_accountModel");

async function verifyExistingUser(searchParams){
    for (const field in searchParams){
        exists = await model.getUserByField(field, searchParams[field]);
        if (exists.length !== 0){
            throw { code: 'ERR_YA_EXISTE', mensaje: `Ya existe un usuario con ese ${field}` }; //ERR_YA_EXISTE
        }
    }
    
}


module.exports = {
    verifyExistingUser
}