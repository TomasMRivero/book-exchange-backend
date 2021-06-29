require('dotenv').config()
const express = require('express');
const rutasUser = require('./rutasUser');
const rutasBook = require('./rutasBook');
const rutasMain = require('./rutasMain')
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const unless = require('express-unless');
const { ERR_AUTH__NOT_LOGGED, ERR_AUTH__INVALID_TOKEN } = require('./errorHandlers');
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

const auth = (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (!token){
            throw ERR_AUTH__NOT_LOGGED
        }

        token = token.replace('Bearer ', '');

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if(err){
                throw ERR_AUTH__INVALID_TOKEN
            }else{
                req.user = user;
                next();
            }
        });

    } catch (e) {
        const status = (e) => {return(e.status?e.status:400)}
        const message = (e) => {return(e.message?e.message:"error inesperado")}
        console.error(e.code);
        res.status(status(e)).json(message(e));
    }
};
auth.unless = unless;

app.use(auth.unless({
    path:[
        {url:'/login', methods:['POST']},
        {url:'/register', method:['POST']},

        //rutas book
        {url: /^\/book\/search\/.*/ , method:['GET']},
        {url: /^\/book\/.*/, method:['GET']}
    ]
}));

app.use('/user', rutasUser);
app.use('/book', rutasBook);
app.use('/', rutasMain)

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});