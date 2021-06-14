const service = require("../services/user/user_accountService");

function registerUser(params){
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
        throw {code: "FALTAN_DATOS" , mensaje: "faltan datos"}; //ERR_FALTAN_DATOS
    }
    const setParams = {
        mail: mail.trim().toLowerCase(),
        gender_id: gender_id,
        alias: alias.trim().toUpperCase(),
        name: name.trim()
    };
}

module.exports = {
    registerUser
}