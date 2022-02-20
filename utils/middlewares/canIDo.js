
const Media = require('../../models/MediaModel');
const User = require('../../models/UserModel');


/**
 * check if user can do what he want to do
 */
module.exports = async ( req, res, next ) => {

    let mediaId = req.params.id;
    let userId = req.body.userId;

    if (
        mediaId != undefined & !isNaN(mediaId) &
        userId != undefined & !isNaN(userId)
        ) {
            try {

                let result = await Media.findAll({ where : { id : mediaId }});

                if ( result.length != 0 ) {
                    let media = result[0].dataValues;

                    if ( media.userID == userId ) {

                        next();

                    } else {
                    
                        res.status(400).json( { message : "Vous n'êtes pas autorisé à faire cela." } );
    
                    }

                } else {

                    res.status(400).json( { message : "media inconnu." } );

                }

            } catch (err) {

                res.status(500).json( { message : "Une erreur est survenue." } );

            }
        } else {

            res.status(400).json( { message : "Données invalides." } );

        }
        

}