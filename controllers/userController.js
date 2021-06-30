const service = require("../services/user/user_accountService");

async function showUserById(id){
    return await service.showUserById(id);
}

async function showUserList(){
    return await service.showUserList();
}

async function updateUser(params){
    const user = await service.showUserById(params.user);
    const setParams = await service.verifyNewValues(params.newValues, user);
    const searchParams = {
        id: params.user
    }
    await service.updateUser(setParams, searchParams);
    return setParams;
}

module.exports = {
    showUserList,
    showUserById,
    updateUser
}