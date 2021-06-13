require('dotenv').config()
var mysql = require('mysql');
var util = require('util');

var settings = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: provess.env.DB_PASS,
    database: process.env.DB_COLLECTION
}

var db;

function connectDatabase(){
    if(!db){
        db = mysql.createConnection(settings);
        db.connect((err) => {
            if(!err){
                console.log('Conexion con la base de datos establecida');
            }else{
                console.log('Error al conectar con la base de datos');
            }
        });
    }
    db.query = util.promisify(db.query).bind(db);
    return db;
}

module.exports = connectDatabase