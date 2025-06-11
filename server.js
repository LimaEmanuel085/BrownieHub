const express = require('express');
const router = require('./router');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(router);

mongoose.connect(process.env.DB_URL).then(() => {

    app.listen(3000, () => {
        console.log('Conectado ao MongoDB Atlas');
        console.log("Servidor iniciado na porta 3000");
        console.log("http://localhost:3000");
    })

}).catch((err) => console.log(err));    
