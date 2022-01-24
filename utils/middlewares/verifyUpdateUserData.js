

const verifyUpdateUserData = ( req, res, next )=>{
    let { secureToken, password, secondePassword } = req.body;

    if (
        secureToken != undefined &
        password != undefined & /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(password) &
        secondePassword != undefined & /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(secondePassword)
    ) {

        // utiliser session pour verifier le secureToken
        if ( password === secondePassword ) {
            
            next();

        }        

    } else {

        res.status(400).json( { message : "Données manquantes ou invalides." } );

    }
}


module.exports = verifyUpdateUserData;