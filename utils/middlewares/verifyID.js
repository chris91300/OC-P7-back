


const verifyID = ( req, res, next ) => {
    let id = req.params.id;

    if ( id != undefined & !isNaN(id)) {
        next()
    } else {
        res.status(400).json( { message : "id invalide." } );
    }
}


module.exports = verifyID;