require('dotenv').config()
const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;



app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});