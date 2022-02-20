

/**
 * Check with regex the datas value for create user
 */
const verifySignupUserData = ( req, res, next )=>{
    let { lastName, firstName, pseudo, email, password } = req.body;

    if (
        lastName != undefined & /^[a-zA-Z]*(( |-)[a-zA-Z]*)?$/.test(lastName) &
        firstName != undefined & /^[a-zA-Z]*(( |-)[a-zA-Z]*)?$/.test(firstName) &
        pseudo != undefined & /^[\w]*$/.test(pseudo) &
        email != undefined & /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &
        password != undefined & /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password)
    ) {

        next();

    } else {

        res.status(400).json( { message : "Données manquantes ou invalides." } );

    }
}


module.exports = verifySignupUserData;