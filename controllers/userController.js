const service = require("../services/user/user_accountService");

async function showUserById(id){
    return await service.showUserById(id);
}

async function showUserList(){
    return await service.showUserList();
}

module.exports = {
    showUserList,
    showUserById
}