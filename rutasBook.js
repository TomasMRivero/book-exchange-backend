const express = require('express');
const route = express.Router();
const controller = require('./Controllers/bookController.js');
const multer = require('multer');
var path = require('path')

const storage = multer.diskStorage({
    destination: "./public/uploads/book/",
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000000 },
});

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

route.get('/types', async(req,res) => {
    try{
        const types = await controller.getBookTypeList();
        res.status(200).json(types);
    }catch (e){
        const status = (e) => {return(e.status?e.status:400)}
        const message = (e) => {return(e.message?e.message:"error inesperado")}
        console.error(e.code);
        res.status(status(e)).json(message(e));
    }
});
route.get('/pictures/:id', async(req,res) => {
    try{
        const pictures = await controller.getBookPictures(req.params.id);
        res.status(200).json(pictures);
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

route.post('/', upload.fields([{ name: "main_picture", maxCount:1 }, {name: "book_pictures", maxCount:8}]), async(req, res) => {
       
    try{
        if(!req.files["main_picture"]){
            throw {message: 'error'}
        }
        const sendParams={
            user_account_id: req.user.user_id,
            ...req.body,
            main_picture: req.files["main_picture"][0],
        };
        const resp = await controller.createBook(sendParams);
        if(req.files["book_pictures"]){
            const pictureParams = {
                book_id: resp.insertId,
                pictures: req.files["book_pictures"],
                timestamp: Date.now()
            }
            await controller.uploadBookPictures(pictureParams);
        }
        res.status(201).json({id: resp.insertId})
    }catch (e){
        const status = (e) => {return(e.status?e.status:400)}
        const message = (e) => {return(e.message?e.message:"error inesperado")}
        console.error(e);
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
        res.send(resp).status(201);
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