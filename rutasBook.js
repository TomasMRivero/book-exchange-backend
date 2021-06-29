const express = require('express');
const route = express.Router();
const controller = require('./Controllers/bookController.js');

route.get('/', async( req ,res) =>{
    try{
        const books = await controller.showBookList();
        res.status(200).json(books);
    }catch (e){
        const status = (e) => {return(e.status?e.status:400)}
        const message = (e) => {return(e.message?e.message:"error inesperado")}
        console.error(e.code);
        res.status(status(e)).json(message(e));
    }
});
route.get('/:id', async(req, res) => {
    try{
        const books = await controller.showBookById(req.params.id);
        res.status(200).json({books});
    }catch (e){
        const status = (e) => {return(e.status?e.status:400)}
        const message = (e) => {return(e.message?e.message:"error inesperado")}
        console.error(e.code);
        res.status(status(e)).json(message(e));
    }
});
route.get('/search/:field', async (req, res) => {
    try{
        //.../search/:author?q=AUTOR1
        const field = req.params.field;
        const searchValue = req.query.q;
        const resp = await controller.showBookListByField(field, searchValue);
        res.json(resp).status(200);
        
    }catch(e){
        const status = (e) => {return(e.status?e.status:400)}
        const message = (e) => {return(e.message?e.message:"error inesperado")}
        console.error(e.code);
        res.status(status(e)).json(message(e));
    }
});

route.post('/', async(req, res) => {
       
    try{
        const sendParams={
            user_account_id: req.user.user_id,
            ...req.body
        };
        const resp = await controller.createBook(sendParams);
        res.status(201).json({id: resp.insertId})
    }catch (e){
        const status = (e) => {return(e.status?e.status:400)}
        const message = (e) => {return(e.message?e.message:"error inesperado")}
        console.error(e.code);
        res.status(status(e)).json(message(e));
    }

});

route.put('/:id', async(req, res) => {

    try {
        const book = await controller.showBookById(req.params.id);
        const sendParams={
            user: req.user.user_id,
            book: book,
            newValues: req.body
        };
        const resp = await controller.updateBook(sendParams);
        res.status(201);
    } catch (e) {
        const status = (e) => {return(e.status?e.status:400)}
        const message = (e) => {return(e.message?e.message:"error inesperado")}
        console.error(e.code);
        res.status(status(e)).json(message(e));
    }

});

route.delete('/:id', async(req, res) => {

    try {
        const sendParams = {
            book_id: req.params.id,
            user_id: req.user.user_id
        };
        const resp = await controller.deleteBook(sendParams);
        res.status(200).json(resp)
    } catch (e) {
        const status = (e) => {return(e.status?e.status:400)}
        const message = (e) => {return(e.message?e.message:"error inesperado")}
        console.error(e.code);
        res.status(status(e)).json(message(e));
    }

});

module.exports = route