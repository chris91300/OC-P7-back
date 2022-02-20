
/**
 * Check with regex the datas value for update password user
 */
const verifyUpdateUserData = ( req, res, next )=>{
    
    let { oldPassword, newPassword, verificationNewPassword } = req.body;
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    

    if (
        oldPassword != undefined & regex.test(oldPassword) &
        newPassword != undefined & regex.test(newPassword) &
        verificationNewPassword != undefined & regex.test(verificationNewPassword)
    ) {

        next();         

    } else {
        
        res.status(400).json( { message : "Données manquantes ou invalides." } );

    }
}


module.exports = verifyUpdateUserData;