


/**
 * check if the id comment is a number
 * id in params with the name commentId
 */
const verifyCommentID = ( req, res, next ) => {
    let id = req.params.commentId;

    if ( id != undefined & !isNaN(id)) {
        next()
    } else {
        res.status(400).json( { message : "id invalide." } );
    }
}


module.exports = verifyCommentID;