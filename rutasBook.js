const express = require('express');
const route = express.Router();
const controller = require('./Controllers/bookController.js');

route.get('/', async( _ ,res) =>{
    try{
        const books = await controller.showBookList();
        res.status(200).json(books);
    }catch (e){
        console.log(e.code);
        res.status(400).json(e.mensaje)
    }
});
route.post('/', async(req, res) => {
       
    try{
        const resp = await controller.createBook(req.body);
        res.status(200).json({id: resp.insertId})
    }catch (e){
        console.log(e.code);
        res.status(400).json(e.mensaje)
    }

});

module.exports = route