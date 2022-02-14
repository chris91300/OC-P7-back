require("dotenv").config();
const app = require('./app');
const { Sequelize } = require('sequelize');
const Database = require('./src/js/class/Database')
const Comment = require('./models/CommentModel');
const User = require('./models/UserModel');
const Media = require('./models/MediaModel');

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;


// CONNECT TO THE DATABASE
sequelize = new Sequelize('groupomaniaMichelChristophe', username, password, {
    host: 'localhost',
    dialect: 'mysql'
  });
  
  
  let connection = async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        User.sync();
        Comment.sync();
        Media.sync();
        
        
      } catch (error) {
          
          if(error.parent.errno === 1049){
              console.log("la database n'existe pas il faut la créer")
              const db = new Database();
             db.createDatabase();
             connection();
          } else {
            console.error('Unable to connect to the database:', error);
          }
        
      }
  }

  connection();
  




app.listen(process.env.PORT,  ()=>{
    
    console.log("serveur à l'écoute sur le port "+ process.env.PORT)
});
