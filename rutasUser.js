const express = require('express');
const route = express.Router();
const controller = require('./Controllers/userController.js');

route.get('/', async(req, res) => {
    try{
        const resp = await controller.showUserList(req.body);
        res.status(200).json(resp)
    }catch (e){
        const status = (e) => {return(e.status?e.status:400)}
        const message = (e) => {return(e.message?e.message:"error inesperado")}
        console.error(e.code);
        res.status(status(e)).json(message(e));
    }
});

route.get('/me', async(req, res) => {

    try {
        console.log(req.user)
        const user = await controller.showUserById(req.user.user_id);
        res.status(200).json(user);
    } catch (e) {
        const status = (e) => {return(e.status?e.status:400)}
        const message = (e) => {return(e.message?e.message:"error inesperado")}
        console.error(e.code);
        res.status(status(e)).json(message(e));
    }

});

route.get('/:id', async(req, res) => {
    try{
        const user = await controller.showUserById(req.params.id);
        res.status(200).json(user);
    }catch (e){
        const status = (e) => {return(e.status?e.status:400)}
        const message = (e) => {return(e.message?e.message:"error inesperado")}
        console.error(e.code);
        res.status(status(e)).json(message(e));
    }
});

route.put('/me', async(req, res) => {
    try {
        const sendParams={
            user: req.user.user_id,
            newValues: req.body
        };
        const resp = await controller.updateUser(sendParams);
        res.send({resp}).status(201);
    } catch (e) {
        const status = (e) => {return(e.status?e.status:400)}
        const message = (e) => {return(e.message?e.message:"error inesperado")}
        console.error(e.code);
        res.status(status(e)).json(message(e));        
    }
});

module.exports = route;