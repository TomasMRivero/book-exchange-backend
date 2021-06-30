const express = require('express');
const route = express.Router();
const controller = require('./Controllers/mainController.js');

route.post('/register', async(req, res) => {
       
    try{
        const resp = await controller.registerUser(req.body);
        res.status(201).json({id: resp.insertId})
    }catch (e){
        const status = (e) => {return(e.status?e.status:400)}
        const message = (e) => {return(e.message?e.message:"error inesperado")}
        console.log(e.code);
        res.status(status(e)).json(message(e))
    }

});

route.post('/login', async(req, res) => {

    try {
        const token = await controller.loginUser(req.body);
        res.send({token})
    } catch (e) {
        const status = (e) => {return(e.status?e.status:400)}
        const message = (e) => {return(e.message?e.message:"error inesperado")}
        console.log(e.code);
        res.status(status(e)).json(message(e))
    }

});

route.post('/logout', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const expDate = new Date(req.user.exp  * 1000)
        const resp = await controller.logoutUser(token, expDate)
        res.send(resp).status(200);
    } catch (e) {
        console.log(e.message);
        res.status(400).send({message: "error al cerrar sesión. Intente nuevamente."})
    }
});

module.exports = route;