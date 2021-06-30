require('dotenv').config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const { ERR_LOGIN__INVALID_USER, ERR_LOGIN__INVALID_PASSWORD } = require("../errorHandlers");
const model = require("../models/user/user_accountModel");

async function loginVerification(params){
    const {
        alias,
        password
    } = params;

    const userExists = await model.getUserByField('alias', alias);
    
    if (userExists.length === 0){
        throw ERR_LOGIN__INVALID_USER
    };
    const user = userExists[0];
    if(!bcrypt.compareSync(password, user.password_hash)){
        throw ERR_LOGIN__INVALID_PASSWORD
    };
    return user;
}

function generateToken(user){
    const tokenData = {
        user_id: user.id,
        alias: user.alias,
        name: user.name
    }

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    })

    return token;
}

async function logoutUser(token, expDate){
    const setParams = {
        token: token,
        exp_date: expDate
    }
    await model.blacklistToken(setParams);
    return {message: 'Sesión cerrada con éxito'}
}

module.exports={
    loginVerification,
    generateToken,
    logoutUser
}