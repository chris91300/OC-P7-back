

const { response } = require('express');
const Media = require('../models/MediaModel');
const User = require('../models/UserModel');
const path = require('path');
const fs = require('fs');


/**
 * Get all medias
 */
exports.GET_ALL = async ( req, res ) => {
    
    try{
        
        let medias = await Media.findAll({
            order : [
                ["createdAt", "desc"]
            ],
            include : [
                {
                    model : User,
                    require : true,
                    attributes: ["pseudo", "urlProfil"]
                
                }
            ]
        });
        
        res.status(200).json(medias);

    } catch ( err ) {

        console.log(err);
        res.status(400).json( { message : "Une erreur est survenue" } );

    }
    

}


/**
 * Create a new media
 */
exports.CREATE = async ( req, res ) => {
    
    if ( req.file ) {

        let { title, text, userId } = req.body;
        let fileName = req.file.filename;
        let data = {
            userId : userId,
            title : title,
            text : text,
            fileName : fileName,
            urlImage : "http://localhost:3000/"+fileName
        }
        
        
        try{
            
            let media = await Media.create(data);

            if (media) {
                let newMedia = await Media.findByPk(media.id, {
                    include : [{
                        model : User,
                        require : false
                    }]
                });
                res.status(201).json(newMedia)

            }

        } catch (err) {
            console.log(err)
            res.status(500).json({ message : "Une erreur est survenue."})

        }

    } else {

        res.status(400).json({ message : "vous n'avez pas indiqué d'image."})

    }
    
}


/**
 * Allow to user to like the media
 */
exports.LIKE = async ( req, res ) => {
    
    let mediaId = req.params.id;
    let userId = req.body.userId;
    let like = req.body.like == 0 || req.body.like == 1 ? parseInt(req.body.like) : undefined;

    if ( like != undefined ){

        try{

            let result = await Media.findAll( { where : { id : mediaId } } );
    
            if ( result.length != 0 ) {
    
                let media = result[0].dataValues;
                
                switch(like){

                    case 1:
                        if ( media.userLiked.indexOf(userId) === -1 ){

                            media.userLiked.push(userId);

                        }
                        break;

                    case 0:
                        let index = media.userLiked.indexOf(userId);
                        if ( index != -1 ){

                            media.userLiked.splice(index, 1);

                        }

                    default:
                        //nothing
                        
                }

                let query = await Media.update(
                        { userLiked : media.userLiked},
                        { where : { id : mediaId } }
                    )
               

                if (!query){
                    throw new Error();
                }

                res.status(200).json({ message : "Votre avis à bien été enregistré"})
    
    
            } else {
                res.status(400).json( { message : "media inconnu." } );
            }
    
        } catch (err) {
    
            res.status(500).json( { message : "Une erreur est survenue." } );
    
        }

    } else {

        res.status(400).json( { message : "Vous aimez ou pas?" } );

    }
    

}

/**
 * Allow to report a media
 * Administrator can see all medias reported and can delete them 
 */
exports.REPORTED = async ( req, res ) => {
    
    let mediaId = req.params.id;  

    try{

        let media = await Media.findByPk( mediaId );
        
        let reportedTotal = media.userReported + 1;

        let query = await Media.update(
                { reported : true, userReported : reportedTotal },
                { where : { id : mediaId } }
            )
        
        
        if (!query){
            throw new Error();
        }

        res.status(200).json({ message : "Nous avons bien pris en compte votre signalement."})


    } catch (err) {

        res.status(500).json( { message : "Une erreur est survenue." } );

    }

   
}



/**
 * ROUTE NOT USE FOR THE MOMENT
 * CAN BE USE LATER IF NEEDED
 */
/*

/**
 * Get a specific media
 */
 exports.GET_ONE = async ( req, res ) => {
   
    let mediaId = req.params.id;

    try{

        let media = await Media.findByPk( mediaId, {
            include : [{
                model : User,
                require : false
            }]
        });
        console.log(media)
        res.status(200).json(media);

    } catch ( err ) {

        console.log(err);
        res.status(400).json( { message : err.message } );

    }
}

/**
 * Update a media
 */
 exports.UPDATE = async ( req, res ) => {
    
    let mediaId = req.params.id;
    let { userId, title, text } = req.body;
    let file = req.file;
    let dataUpdated = {
        userId : userId,
        title : title,
        text : text
    }

    if (file) {
        dataUpdated.fileName = file.filename;
    }

    try{

        let result = await Media.findAll({where : { id : mediaId, userId : userId } } ); 

        if ( result.length != 0 ) {
            if ( file ){
                let media = result[0].dataValues;
                let oldFileName = media.fileName;
                let oldPathFile = path.resolve('./medias')+"/"+oldFileName;
                fs.unlink(oldPathFile, (err)=>{
                    if (err ){ console.log(err)}
                    console.log("fs unlink")
                });
            }
            
    
            let mediaUpdated = await Media.update(dataUpdated, {where : { id : mediaId } });
            if ( mediaUpdated ) {
                res.json({message : "okokokokok"})
            }  
        } else {
            res.status(401).json({message : "Vous n'êtes pas autorisé à modifier ce media"})
        }
             

        
    } catch ( err ) {

        res.status(400).json( { message : err.message } )
    }
    
}
