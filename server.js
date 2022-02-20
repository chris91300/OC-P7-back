require("dotenv").config();
const app = require('./app');
const database = require('./src/js/class/SequelizeDB')
const Comment = require('./models/CommentModel');
const User = require('./models/UserModel');
const Media = require('./models/MediaModel');


  
//  CONNECT TO THE DATABASE
  let connection = async ()=>{
    try {

        await database.authenticate();
        console.log('Connection has been established successfully.');
        User.sync();
        Comment.sync();
        Media.sync();        
        
      } catch (error) {

           console.error('Unable to connect to the database:', error);
                 
      }
  }

  connection();
  




app.listen(process.env.PORT,  ()=>{
    
    console.log("serveur à l'écoute sur le port "+ process.env.PORT)
});
