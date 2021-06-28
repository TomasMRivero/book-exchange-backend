const express = require('express');
const route = express.Router();
const controller = require('./Controllers/bookController.js');

route.get('/', async( _ ,res) =>{
    try{
        const books = await controller.showBookList();
        res.status(200).json(books);
    }catch (e){
        console.log(e.code);
        res.status(e.status).json(e.message)
    }
});
route.get('/:id', async(req, res) => {
    try{
        const books = await controller.showBookById(req.params.id);
        res.status(200).json(books);
    }catch (e){
        console.log(e.code);
        res.status(e.status).json(e.message)
    }
});
route.get('/search/:field', async (req, res) => {
    try{
        //.../search/:author?q=AUTOR1
        const field = req.params.field;
        const searchValue = req.query.q;
        const resp = await controller.showBookListByField(field, searchValue);
        if(resp.length > 0){
            res.status(200);
        }else{
            res.status(204);
        }
        res.json(resp)
        
    }catch(e){
        console.log(e.code);
        res.status(e.status).json(e.message)
    }
});

route.post('/', async(req, res) => {
       
    try{
        const resp = await controller.createBook(req.body);
        res.status(201).json({id: resp.insertId})
    }catch (e){
        console.log(e.code);
        res.status(e.status).json(e)
    }

});

module.exports = route