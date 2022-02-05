const express = require('express');
const helmet = require('helmet');
const app = express();
const cookieParser = require("cookie-parser");
//const sessions = require('express-session');  //require('cookie-session'); //
const usersRouter = require('./routes/usersRoutes');
const mediasRouter = require('./routes/mediasRoutes');
const commentsRouter = require('./routes/commentsRoutes');
const sessionRouter = require('./routes/sessionRoutes');
/*
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
console.log(process.env.COOKIESECRET)
//session middleware
app.use(sessions({
  secret: process.env.COOKIESECRET,
  saveUninitialized:false,
  cookie: { maxAge: oneDay },
  resave: false
}));*/
/*app.use(sessions({
  name: 'session',
  secret: process.env.COOKIESECRET,

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))*/


app.use(express.json());
// cookie parser middleware
app.use(cookieParser());

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




//app.use(express.static("images"));
app.use(express.static("medias"));
app.use("/profils/", express.static("profils"));
app.use('/api/users', usersRouter);
app.use('/api/medias', mediasRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/session', sessionRouter);



module.exports = app;