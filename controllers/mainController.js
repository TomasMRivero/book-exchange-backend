const { ERR_INPUT__MISSING_DATA } = require("../errorHandlers");
const service = require("../services/user/user_accountService");

async function loginUser(params){

    if(!params.alias || !params.alias.trim() || !params.password){
        throw ERR_INPUT__MISSING_DATA
    };

    const user = await service.loginVerification(params);

    const token = await service.generateToken(user);

    return token;

}

async function registerUser(params){

    const setParams = await service.verifySetParams(params);

    const searchParams = {
        mail: setParams.mail,
        alias: setParams.alias
    };
    
    await service.verifyExistingUser(searchParams);

    return await service.registerUser(setParams);
}

module.exports = {
    registerUser,
    loginUser
}