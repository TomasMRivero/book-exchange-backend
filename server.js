require('dotenv').config()
const express = require('express');
const rutasUser = require('./rutasUser')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('user/', rutasUser);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});