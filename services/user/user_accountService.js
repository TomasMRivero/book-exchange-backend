const { ERR_USER__EXISTING_MAIL, ERR_USER__EXISTING_ALIAS, ERR_USER__INVALID_GENDER, ERR_USER__NOT_FOUND, ERR_INPUT__MISSING_DATA } = require("../../errorHandlers");
const model = require("../../models/user/user_accountModel");

const bcrypt = require('bcrypt');

async function showUserList(){
    return await model.getUserList();
}

async function showUserById(id){
    const user = await model.getUserById(id)
    if (user.length === 0){
        throw ERR_USER__NOT_FOUND;
    }
    return user[0];
}

async function verifySetParams(params){
    
    const {
        mail,
        gender_id,
        alias,
        name,
        password
    } = params;

    if (
        !mail || !mail.trim() ||
        !gender_id ||
        !alias || !alias.trim() ||
        !name || !name.trim() ||
        !password
    ){
        throw ERR_INPUT__MISSING_DATA;
    }

    const genderExists =  await model.getGenderById(gender_id);
    if (genderExists.length === 0){
        throw ERR_USER__INVALID_GENDER;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    return {
        mail: mail.trim().toLowerCase(),
        gender_id: gender_id,
        alias: alias.trim().toUpperCase(),
        name: name.trim(),
        password_hash: encryptedPassword
    };
}

async function verifyExistingUser(searchParams){

    const {
        mail,
        alias
    } = searchParams;
    
    let exists = await model.getUserByField('mail', mail);
    if (exists.length !== 0){
        throw ERR_USER__EXISTING_MAIL;
    }
    exists = await model.getUserByField('alias', alias);
    if (exists.length !== 0){
        throw ERR_USER__EXISTING_ALIAS;
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