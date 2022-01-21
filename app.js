const express = require('express');
const helmet = require('helmet');
const app = express();
const usersRouter = require('./routes/usersRoutes');
const mediasRouter = require('./routes/mediasRoutes');
const commentsRouter = require('./routes/commentsRoutes');



app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });


  // Pour que l'on puisse autoriser à récupérer les images
//app.use(helmet());
//app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));




//app.use(express.static("images"));
app.use(express.static("dist"));
app.use('/api/users', usersRouter);
app.use('/api/medias', mediasRouter);
app.use('/api/comments', commentsRouter);



module.exports = app;