
/**
 * Check with regex the datas value for login user
 */
const verifyLoginUserData = ( req, res, next )=>{
    let { pseudo, password } = req.body;

    if (
        pseudo != undefined & /^[\w]{6,}$/.test(pseudo) &
        password != undefined & /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(password)
    ) {

        next();

    } else {

        res.status(400).json( { message : "Données manquantes ou invalides." } );

    }
}


module.exports = verifyLoginUserData;