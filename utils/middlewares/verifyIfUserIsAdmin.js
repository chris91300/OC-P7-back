
const jwt = require('jsonwebtoken');
const User = require('../../models/UserModel')

/**
 * verify if the user is authorize to do this requet
 * get the token in headers autorization
 * get the userId in encoded in the token
 * if userId is a valid id and user is in the DB , he can
 * else he can't
 */
module.exports = async (req, res, next) => {

  try {
      
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    let query = { where : { id : userId} } 
    
     try{

        let user = await User.findByPk( userId );

        if ( user.admin ){
            console.log("user identifié et admin")
            next();
        } else {
            console.log("user non admin")
            throw new Error();
        }

     }  catch ( err ) {
        
        res.status(401).json({ message : "vous n'avez pas les droits." });
            
    }     
    
  } catch {
         
        res.status(401).json({ message : 'jeton invalide' });
  }
};