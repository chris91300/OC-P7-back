

const { response } = require('express');
const Media = require('../models/MediaModel');
const User = require('../models/UserModel');
const path = require('path');
const fs = require('fs');
const Comment = require('../models/CommentModel');

exports.GET_MEDIAS_REPORTED = async ( req, res )=>{
    
    try{
        
        
        let medias = await Media.findAll({
            where : {
                reported : true
            },
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
        res.status(400).json( { message : "Une erreur est survenue." } );

    }

}


/**
 * Allow to remove the report of the  media only by admin
 */
 exports.REMOVE_REPORTED_MEDIA = async ( req, res ) => {
    
    let mediaId = req.params.id;  

    try{

        let media = await Media.findByPk( mediaId );
        
        let reportedTotal = media.userReported - 1;

        let query = await Media.update(
                { reported : false, userReported : reportedTotal },
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


exports.GET_COMMENTS_REPORTED = async ( req, res )=>{
    
    try{
        
        let comments = await Comment.findAll({
            where : {
                reported : true
            },
            order : [
                ["createdAt", "desc"]
            ],
            include : [
                {
                    model : User,
                    require : true,
                    attributes: ["pseudo", "urlProfil"]
                
                },
                {
                    model : Media,
                    require : true,
                    attributes: ["urlImage"]
                
                }
            ]
        });
        
        res.status(200).json(comments);

    } catch ( err ) {

        console.log(err);
        res.status(400).json( { message : "Une erreur est survenue." } );

    }

}


/**
 * Allow to remove the report of the  comment only by admin
 */
 exports.REMOVE_REPORTED_COMMENT = async ( req, res ) => {
    
    let commentId = req.params.id;  

    try{

        let comment = await Comment.findByPk( commentId );
        
        let reportedTotal = comment.userReported - 1;

        let query = await Comment.update(
                { reported : false, userReported : reportedTotal },
                { where : { id : commentId } }
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
 * delete a comment
 */
 exports.DELETE_COMMENT = async ( req, res ) => {
       
    let commentId = req.params.id;
    

    try{
        
        
        let result = await Comment.destroy({ where : {id : commentId} } )
        
        
        if (result != undefined) {

            res.status(200).json( { message : "Commentaire retiré." } );

        } else {

            res.status(400).json( { message : "Commentaire inconnu." } );
        }

    } catch (err) {

        res.status(500).json( { message : "Une erreur est survenue." } );

    }
}

/**
 * Delete a media
 */
 exports.DELETE_MEDIA = async ( req, res ) => {
    
    let mediaId = req.params.id;

    try{

        let media = await Media.findByPk( mediaId );        
        
        let oldFileName = media.fileName;
        let oldPathFile = path.resolve('./medias')+"/"+oldFileName;
        
        fs.unlink(oldPathFile, (err)=>{

            if (err ){ console.log(err)}
            
        });

        let resultDestroy = await Media.destroy({where : {
            id : mediaId
        }})
    
        if (resultDestroy){
    
            res.json({message : "supprimé"})

        } else {
            
            res.status(401).json({message : "Vous n'êtes pas autorisé à supprimer ce media"})
        }
        

        
    }catch (err){
        console.log(err)
        res.status(500).json({message : "Une erreur est survenue."})
    }
    
}