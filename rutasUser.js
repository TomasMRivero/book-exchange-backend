const express = require('express');
const route = express.Router();
const controller = require('./Controllers/userController.js');

route.get('/', async(req, res) => {
    try{
        const resp = await controller.showUserList(req.body);
        res.status(200).json(resp)
    }catch (e){
        console.log(e.code);
        res.status(400).json(e.mensaje)
    }
});
route.get('/:id', async(req, res) => {
    try{
        const user = await controller.showUserById(req.params.id);
        res.status(200).json(user);
    }catch (e){
        console.log(e.code);
        res.status(400).json(e.mensaje)
    }
});
route.post('/', async(req, res) => {
       
    try{
        const resp = await controller.registerUser(req.body);
        res.status(200).json({id: resp.insertId})
    }catch (e){
        console.log(e.code);
        res.status(400).json(e.mensaje)
    }

});

module.exports = route;