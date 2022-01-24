

const verifyLoginUserData = ( req, res, next )=>{
    let { pseudo, password } = req.body;

    if (
        pseudo != undefined & /^[\w]*$/.test(pseudo) &
        password != undefined & /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(password)
    ) {

        next();

    } else {

        res.status(400).json( { message : "Données manquantes ou invalides." } );

    }
}


module.exports = verifyLoginUserData;