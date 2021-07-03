require('dotenv').config()
const express = require('express');
const rutasUser = require('./rutasUser');
const rutasBook = require('./rutasBook');
const rutasMain = require('./rutasMain');

const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const unless = require('express-unless');
const { ERR_AUTH__NOT_LOGGED, ERR_AUTH__INVALID_TOKEN } = require('./errorHandlers');
const { searchToken } = require('./services/authService');
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

const auth = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (!token){
            throw ERR_AUTH__NOT_LOGGED;
        }

        token = token.replace('Bearer ', '');
        console.log(token);
        await searchToken(token);
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
        {url: '/book', method:['GET']},
        {url: /^\/book\/search\/.*/ , method:['GET']},
        {url: /^\/book\/.*/, method:['GET']},

        //rutas user
        {url:'/user', methods:['GET']},
        {url: /^\/user\/.[^me]/, methods:['GET']},

        {url:/^\/uploads\/.*/},
    ]
}));

app.use('/user', rutasUser);
app.use('/book', rutasBook);
app.use('/', rutasMain)

var publicDir = require('path').join(__dirname,'/public'); 
app.use(express.static(publicDir)); 

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});