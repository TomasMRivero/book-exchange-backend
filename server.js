require('dotenv').config()
const express = require('express');
const rutasUser = require('./rutasUser');
const rutasBook = require('./rutasBook');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use('/user', rutasUser);
app.use('/book', rutasBook);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});