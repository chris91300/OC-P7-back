const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const usersRouter = require('./routes/usersRoutes');
const mediasRouter = require('./routes/mediasRoutes');
const commentsRouter = require('./routes/commentsRoutes');
const adminRouter = require('./routes/adminRoutes');


app.use(express.json());


// SECURITY **************************************

app.use(cors());

app.use(helmet());

// COMMUNICATE WITH THE APPLICATION
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));
app.use(helmet.contentSecurityPolicy({
    directives : {
      defaultSrc: "localhost:8080",
      'img-src' : "localhost:8080"
    }
  }));



// INDICATE THE PUBLIC DIRECTORY
app.use(express.static("medias"));
app.use("/profils/", express.static("profils"));

// ROUTER
app.use('/api/users', usersRouter);
app.use('/api/medias', mediasRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/admin', adminRouter);


module.exports = app;