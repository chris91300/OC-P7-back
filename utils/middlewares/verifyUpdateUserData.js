

const verifyUpdateUserData = ( req, res, next )=>{
    console.log("verification password")
    /*let oldPassword = req.doby.oldPassword;
    let oldPassword = req.doby.oldPassword;
    let oldPassword = req.doby.oldPassword;*/
    console.log(req.body)
    let { oldPassword, newPassword, verificationNewPassword } = req.body;
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    console.log("old pass => " + oldPassword)
    console.log("new pass => " + newPassword)
    console.log("ver pass => " + verificationNewPassword)
    console.log("old pass => " + regex.test(oldPassword))
    console.log("new pass => " + regex.test(newPassword))
    console.log("ver pass => " + regex.test(verificationNewPassword))



    if (
        oldPassword != undefined & regex.test(oldPassword) &
        newPassword != undefined & regex.test(newPassword) &
        verificationNewPassword != undefined & regex.test(verificationNewPassword)
    ) {

        next();
        // utiliser session pour verifier le secureToken
       /* if ( newPassword === verificationNewPassword ) {
            console.log("verification des password pour update ok")
            next();

        }   */    

    } else {
        console.log("password probleme")
        res.status(400).json( { message : "Données manquantes ou invalides." } );

    }
}


module.exports = verifyUpdateUserData;