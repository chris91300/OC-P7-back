
const Media = require('../../models/MediaModel');

/**
 * Check if media exist in the database
 */
module.exports = async ( req, res, next ) => {
    
    let mediaId = req.params.id;
   
    if ( mediaId != undefined & !isNaN(mediaId) ) {

        try{

            let media = await Media.findAll({where : { id : mediaId } } );
            
            if ( media.length != 0 ) {

                next();

            } else {

                throw new Error('media inconnu.');

            }

        } catch ( err ) {
            console.log(err)
            res.status(400).json( { message : err.message } )

        }

    } else {

        res.status(400).json( { message : 'données invalides.' } )

    }

    
}