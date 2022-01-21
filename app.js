const express = require('express');
const helmet = require('helmet');
const app = express();
//const authRouter = require('./router/authRouter');
//const saucesRouter = require('./router/saucesRouter');



app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });


  // Pour que l'on puisse autoriser à récupérer les images
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));




//app.use(express.static("images"));
app.use(express.static("dist"));
//app.use('/api/auth', authRouter);
//app.use('/api/sauces', saucesRouter);



module.exports = app;