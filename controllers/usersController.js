const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const User = require('../models/UserModel');


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

    try{ // try to get a hashed password 
       
        let hash = await bcrypt.hash(password, 10);

        let data = {
            firstName : firstName,
            lastName : lastName,
            pseudo : pseudo,
            email : email,
            password : hash
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
            console.log("password est ok")
            let token = jwt.sign(
                { userId: user._id },
                process.env.TOKEN,
                { expiresIn: '24h' }
                );

            let userdata = {
                
                userId : user.id,
                token : token
            };
            user.token = token;
            user.password = "";
            console.log("user envoyé pour login")
            console.log(user)
            res.status(200).json(user);


        } else {
            console.log("password pas ok")
            res.status(400).json({ message : "Password invalide"});
        }

    } catch(err){// catch find user
        console.log("probleme")
        console.log(res)
        res.status(400).json({ message : "Utilisateur inconnu" })
        
    }
}

/**
 * user modifie son profil 
 */
exports.UPDATE = async ( req, res ) => {
    console.log("user update")
    let userId = req.params.id;
    let password = req.body.password;  

    try{ // try to get a hashed password 
       
        let hash = await bcrypt.hash(password, 10);        
        console.log(hash)
        try{// try to update user
            
            let userUpdate = await User.update({ password: hash }, {
                where: {
                  id: userId
                }});

            if ( userUpdate ) {
                console.log(userUpdate);
                res.status(200).json({message : "Votre mot de passe à bien été mis à jour."});

            }

            

        } catch (err) {// catch save user
            
            res.status(400).json({ message : err.message })
        }
        

    } catch ( err ) {// catch hash password
        
        res.status(500).json({ message : "Une erreur est survenue lors de votre enregistrement" })
    }
}

/**
 * user supprime son profil
 */
exports.DELETE = async ( req, res ) => {
    console.log("user delete")
    let userId = req.params.id;

    try {
        await User.destroy({
            where: {
              id: userId
            }
          });

          res.status(200).json({message : "Votre profil à bien été supprimé."});

    } catch (err) {

        res.status(400).json({ message : err.message })

    }
    
}

