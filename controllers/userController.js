const service = require("../services/user/user_accountService");

async function registerUser(params){

    const setParams = await service.verifySetParams(params);

    const searchParams = {
        mail: setParams.mail,
        alias: setParams.alias
    };
    
    await service.verifyExistingUser(searchParams);

    return await service.registerUser(setParams);
}

async function showUserList(){
    return await service.showUserList();
}

module.exports = {
    registerUser,
    showUserList
}