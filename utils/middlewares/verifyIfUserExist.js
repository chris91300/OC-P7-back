
const User = require('../../models/UserModel');

module.exports = async ( req, res, next ) => {
    
    let userId = req.body.userId;
   
    if ( userId != undefined & !isNaN(userId) ) {

        try{

            let user = await User.findAll({where : { id : userId } } );
            
            if ( user.length != 0 ) {

                next();

            } else {

                throw new Error('utilisateur inconnu.');

            }

        } catch ( err ) {
            console.log(err)
            res.status(400).json( { message : err.message } )

        }

    } else {

        res.status(400).json( { message : 'données invalides.' } )

    }

    
}