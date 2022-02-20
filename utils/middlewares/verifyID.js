

/**
 * check if the id is a number
 * id in params with the name id
 */
const verifyID = ( req, res, next ) => {
    let id = req.params.id;
    console.log("verification id")
    if ( id != undefined & !isNaN(id)) {

        next()

    } else {

        res.status(400).json( { message : "id invalide." } );

    }
}


module.exports = verifyID;