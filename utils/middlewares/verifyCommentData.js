


module.exports = ( req, res, next ) => {

    let userId = req.body.userId;
    let text = req.body.text;

    if ( 
        userId != undefined & !isNaN(userId) &
        text != undefined & !/<script/.test(text)
    ) {

        next();
        
    } else {

        res.status(400).json( { message : "Données invalides." } );

    }
}