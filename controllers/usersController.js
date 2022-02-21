
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const User = require('../models/UserModel');
const Media = require('../models/MediaModel');


/**
 * create a new user
 */
exports.SIGNUP = async ( req, res ) => {
    
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let pseudo = req.body.pseudo;
    let email = req.body.email;
    let password = req.body.password; 
    let urlProfil = req.body.urlProfil;   

    try{ 
       
        //  Hash password user for security
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
            
            let item = err.errors[0].path;
            let message = item != undefined ? `${item} déjà pris` : "Une erreur est survenue";
            res.status(400).json({ message : message })
        }
        

    } catch ( err ) {// catch hash password
        console.log(err)
        res.status(500).json({ message : "Une erreur est survenue lors de votre enregistrement" })
    }
        

}

/**
 * user log in
 */
exports.LOGIN = async ( req, res ) => {
    
    let pseudo= req.body.pseudo;
    let password = req.body.password;
    let query = { where : { pseudo : pseudo} } 

    try{ // try to find the user and compare the two passwords
       
        let result = await User.findAll( query);
       
        let user = result[0].dataValues;
        let loginAttempt = user.loginAttempt;
        let timeToWait = 0;
        
        /**
         * Security for login attempt.
         * over 5 attempts, add 2 sec to setTimeout for each attempt
         * 6 attempt -> wait 2 sec
         * 7 attempt -> wait 4 sec ...
         */ 
        if ( loginAttempt > 5 ) {
            let base = 2000;
            timeToWait = base * ( loginAttempt - 5)
        }
    

        await setTimeout(async ()=>{

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
                let result = await User.update( {loginAttempt : 0}, query);
                res.status(200).json(user);
    
    
            } else {
                loginAttempt++;
                let result = await User.update( {loginAttempt : loginAttempt}, query);
                res.status(400).json({ message : "Password invalide"});
            }
        }, timeToWait)
       

    } catch(err){// catch find user
        
        res.status(400).json({ message : "Utilisateur inconnu" })
        
    }
}

/**
 * user update his password 
 */
exports.UPDATE_PASSWORD = async ( req, res ) => {
    
    let userId = req.params.id;
    let oldPassword = req.body.oldPassword;  
    let newPassword = req.body.newPassword; 
    let verificationNewPassword = req.body.verificationNewPassword; 

    try{ 

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


/**
 * user update his picture profil 
 */
exports.UPDATE_PICTURE = async (req, res ) => {
    
    if ( req.file ) {

        let userId = req.params.id;
        let oldUrlProfil = req.body.urlProfil;
        let fileName = req.file.filename;
        let urlProfil = process.env.URLPROFILDIRECTORY + fileName
        let regexDefaultProfilPicture = /^profil_([1-9]||1[0-4]).jpg$/
        let oldFileName = path.basename(oldUrlProfil);

        
        try{

            let userUpdate = await User.update({ urlProfil: urlProfil }, {
                where: {
                  id: userId
                }});
    
            if ( userUpdate ) {
                
                // delete old picture if it's not a default picture
                if ( !regexDefaultProfilPicture.test(oldFileName) ) {
                    let pathToUnlink = path.resolve('./profils')+"/"+oldFileName;
                    fs.unlink(pathToUnlink, (err)=>{

                        if (err ){ console.log(err)}
                        
                    });
                }
                res.status(200).json({newUrlProfil : urlProfil});
    
            }

        }catch(err){
            
            res.status(500).json({ message : "Une erreur est survenue lors de la modification de votre photo" })

        }
        
        


    } else {

        res.status(400).json({ message : "vous n'avez pas indiqué d'image."})

    }
}


/**
 * delete user
 */
exports.DELETE = async ( req, res ) => {
    
    let userId = req.params.id;
    let urlProfil = req.body.urlProfil;
    let regexDefaultProfilPicture = /^profil_([1-9]||1[0-4]).jpg$/
    try {

        let medias = await Media.findAll({
            where: {
                userId: userId
              }
        })

        

        // delete user and all medias and comments user
        await User.destroy({
            where: {
              id: userId
            }
          });

        
        let fileName = path.basename(urlProfil)

        // delete old picture if it's not a default picture
        if ( !regexDefaultProfilPicture.test(fileName) ) {

            let pathToUnlink = path.resolve('./profils')+"/"+fileName;
            fs.unlink(pathToUnlink, (err)=>{

                if (err ){ console.log(err)}
                
            });
        }

        // delete all media picture of the user in the directory medias
        medias.map((media)=>{
            
            let mediaName = media.fileName;
            let mediaPath = path.resolve('./medias')+"/"+mediaName;
            fs.unlink(mediaPath, (err)=>{
                
                if (err ){ console.log(err)}
                
            });
        })

          res.status(200).json({message : "Votre profil à bien été supprimé."});

    } catch (err) {

        res.status(400).json({ message : err.message })

    }
    
}

