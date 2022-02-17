
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const User = require('../models/UserModel');
const Media = require('../models/MediaModel');
const Comment = require('../models/CommentModel');


/**
 * user s'enregistre
 * OK
 */
exports.SIGNUP = async ( req, res ) => {
    console.log("user signup")
    
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let pseudo = req.body.pseudo;
    let email = req.body.email;
    let password = req.body.password; 
    let urlProfil = req.body.urlProfil;   

    try{ // try to get a hashed password 
       
        let hash = await bcrypt.hash(password, 10);

        let data = {
            firstName : firstName,
            lastName : lastName,
            pseudo : pseudo,
            email : email,
            password : hash,
            urlProfil : urlProfil
        };

        if ( /admin/i.test(pseudo) ) {
            data.admin = true
        }
        

        try{// try to save the new User
            
            let newUser = await User.create(data);
            
            if ( newUser ) {

                res.status(201).json(newUser);

            }

        } catch (err) {// catch save user
            
            res.status(400).json({ message : err.message })
        }
        

    } catch ( err ) {// catch hash password
        
        res.status(500).json({ message : "Une erreur est survenue lors de votre enregistrement" })
    }
        

}

/**
 * user se connecte
 * OK
 */
exports.LOGIN = async ( req, res ) => {
    console.log("user login")
    
    let pseudo= req.body.pseudo;
    let password = req.body.password;
    let query = { where : { pseudo : pseudo} } 

    try{ // try to find the user and compare the two passwords
       
        let result = await User.findAll( query);
       
        let user = result[0].dataValues;
        
        let hash = user.password;
        let passwordIsTheSame = await bcrypt.compare(password, hash);
        
        if( passwordIsTheSame ) {
            
            let token = jwt.sign(
                { userId: user.id },
                process.env.TOKEN,
                { expiresIn: '24h' }
                );
           
            user.token = token;
            user.password = "";
            
            res.status(200).json(user);


        } else {
           
            res.status(400).json({ message : "Password invalide"});
        }

    } catch(err){// catch find user
        
        res.status(400).json({ message : "Utilisateur inconnu" })
        
    }
}

/**
 * user update his password 
 */
exports.UPDATE_PASSWORD = async ( req, res ) => {
    console.log("user update")
    let userId = req.params.id;
    let oldPassword = req.body.oldPassword;  
    let newPassword = req.body.newPassword; 
    let verificationNewPassword = req.body.verificationNewPassword; 

    try{ // try to get a hashed password 

        let user = await User.findByPk(userId);       
        
        let passwordIsTheSame = await bcrypt.compare(oldPassword, user.password);

        if ( passwordIsTheSame ) {
            
            if( newPassword === verificationNewPassword ) {

                let hash = await bcrypt.hash(newPassword, 10);
            
                let userUpdate = await User.update({ password: hash }, {
                    where: {
                        id: userId
                    }});

                if ( userUpdate ) {
                    
                    res.status(200).json({message : "Votre mot de passe à bien été mis à jour."});

                }


            } else {

                res.status(400).json({ message : "votre nouveau password et sa vérification ne sont pas identique." })

            }


        } else {

            res.status(400).json({ message : "votre ancien password n'est pas valide." })

        }      
                
        
        

    } catch ( err ) {// catch hash password
        
        res.status(500).json({ message : "Une erreur est survenue lors de votre enregistrement" })
    }
}



exports.UPDATE_PICTURE = async (req, res ) => {
    console.log("update picture")
    if ( req.file ) {

        let userId = req.params.id;
        let oldUrlProfil = req.body.urlProfil;
        let fileName = req.file.filename;
        let urlProfil = process.env.URLPROFILDIRECTORY + fileName
        let regexDefaultProfilPicture = /^profil_([1-9]||1[0-4]).jpg$/

        /*let splitOldUrl = oldUrlProfil.split("/");
        let lastIndex = parseInt(splitOldUrl.length) -1;*/
        let oldFileName = path.basename(oldUrlProfil);

        
        try{

            let userUpdate = await User.update({ urlProfil: urlProfil }, {
                where: {
                  id: userId
                }});
    
            if ( userUpdate ) {
                console.log(userUpdate);
                // delete old
                if ( !regexDefaultProfilPicture.test(oldFileName) ) {
                    let pathToUnlink = path.resolve('./profils')+"/"+oldFileName;
                    fs.unlink(pathToUnlink, (err)=>{

                        if (err ){ console.log(err)}
                        
                    });
                }
                res.status(200).json({newUrlProfil : urlProfil});
    
            }

        }catch(err){
            console.log(err)
            res.status(500).json({ message : "Une erreur est survenue lors de la modification de votre photo" })

        }
        
        


    } else {

        res.status(400).json({ message : "vous n'avez pas indiqué d'image."})

    }
}

/**
 * user supprime son profil
 */
exports.DELETE = async ( req, res ) => {
    console.log("user delete")
    let userId = req.params.id;
    let urlProfil = req.body.urlProfil;

    try {
        await User.destroy({
            where: {
              id: userId
            }
          });

          //    VISIBLEMENT TOUS CE QUI CONCERNE LE USER ID EST SUPPRIMÉ
       /* await Media.destroy({
            where: {
                userId: userId
              }
        })

        await Comment.destroy({
            where: {
                userId: userId
              }
        })*/
        
        let fileName = path.basename(urlProfil)
        let pathToUnlink = path.resolve('./profils')+"/"+fileName;
        fs.unlink(pathToUnlink, (err)=>{

            if (err ){ console.log(err)}
            
        });

          res.status(200).json({message : "Votre profil à bien été supprimé."});

    } catch (err) {

        res.status(400).json({ message : err.message })

    }
    
}

