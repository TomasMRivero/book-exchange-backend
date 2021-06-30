require('dotenv').config();
const bcrypt = require('bcrypt');

const { ERR_USER__EXISTING_MAIL, ERR_USER__EXISTING_ALIAS, ERR_USER__INVALID_GENDER, ERR_USER__NOT_FOUND, ERR_INPUT__MISSING_DATA, ERR_LOGIN__INVALID_USER, ERR_LOGIN__INVALID_PASSWORD } = require("../../errorHandlers");
const model = require("../../models/user/user_accountModel");


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

async function verifyNewValues(params, book){

    const alias = (() => {return (!params.alias || !params.alias.trim()?user.alias:params.alias.toUpperCase().trim())});
    const name = (() => {return (!params.name || !params.name.trim()?user.name:params.name.toUpperCase().trim())});
   
    setParams = {
        alias: alias(),
        name: name()
    };

    return setParams

}

async function updateUser(setParams, searchParams){
    return await model.updateUser(setParams, searchParams);
}

module.exports = {
    showUserList,
    showUserById,
    verifySetParams,
    verifyExistingUser,
    registerUser,
    verifyNewValues,
    updateUser

}