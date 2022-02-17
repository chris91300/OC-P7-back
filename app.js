const express = require('express');
const helmet = require('helmet');
const app = express();
//const cookieParser = require("cookie-parser");
//const sessions = require('express-session');  //require('cookie-session'); //
const usersRouter = require('./routes/usersRoutes');
const mediasRouter = require('./routes/mediasRoutes');
const commentsRouter = require('./routes/commentsRoutes');
const adminRouter = require('./routes/adminRoutes');
//const sessionRouter = require('./routes/sessionRoutes');
const ErrorRouter = require('./routes/404Routes');



app.use(express.json());
// cookie parser middleware
//app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Session');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });


  // Pour que l'on puisse autoriser à récupérer les images
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));
// pour communiquer avec l'API
app.use(helmet.contentSecurityPolicy({
    directives : {
      defaultSrc: "localhost:8080",
      'img-src' : "localhost:8080"
    }
  }));




app.use(express.static("medias"));
app.use("/profils/", express.static("profils"));
app.use('/api/users', usersRouter);
app.use('/api/medias', mediasRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/admin', adminRouter);






module.exports = app;