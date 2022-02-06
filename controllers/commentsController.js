
const { response } = require('express');
const Comment = require('../models/CommentModel');


/**
 * get all comments on a specific media
 */
exports.GET_ALL = async ( req, res ) => {
    console.log("comment GET_ALL")
    let mediaId = req.params.id;

    try{

        let results = await Comment.findAll({ where : { mediaID : mediaId } } );

        res.status(200).json( results);

    } catch (err) {

        console.log(err);
        res.status(500).json( { message : "Une erreur est survenue."})

    }
}

/**
 * get one comment
 */
exports.GET_ONE = async ( req, res ) => {
    console.log("comment GET_ONE")
    let mediaId = req.params.id;
    let commentId = req.params.commentId;

    try{

        let results = await Comment.findAll( { where : { 
            id : commentId,
            mediaID : mediaId
        }})

        if ( results.length != 0) {

            let comment = results[0].dataValues;

            res.status(200).json( comment );

        } else {

            res.status(400).json( { message : "Commentaire inconnu." } );

        }

    } catch (err) {

        res.status(500).json( { message : "Une erreur est survenue." } );

    }
}

/**
 * create a new comment about a media 
 */
exports.CREATE = async ( req, res ) => {
    console.log("comment CREATE")
    let mediaId = req.params.id;
    let { userId , text } = req.body;

    try{

        let data = {
            userId : userId,
            mediaId : mediaId,
            text : text
        };

        let comment = await Comment.create(data)
        
        if (comment) {

            res.status(201).json( comment );

        }

    } catch (err) {

        res.status(500).json( { message : "Une erreur est survenue." } );

    }
}

/**
 * update a comment
 */
exports.UPDATE = async ( req, res ) => {
    console.log("comment update")
    let mediaId = req.params.id;
    let commentId = req.params.commentId;
    let { userId , text } = req.body;

    try{

        let update = {
            text : text
        };

        let result = await Comment.update(
            update,
            { where : {
                id : commentId,
                userID : userId,
                mediaID : mediaId
            }})
        console.log("result = "+result[0])
        
        if (result[0] != 0) {

            res.status(200).json( { message : "Commentaire mis à jour." } );

        } else {

            res.status(400).json( { message : "Commentaire inconnu." } );
        }

    } catch (err) {

        res.status(500).json( { message : "Une erreur est survenue." } );

    }
}

/**
 * delete a comment
 */
exports.DELETE = async ( req, res ) => {
    console.log("comment delete")
    let mediaId = req.params.id;
    let commentId = req.params.commentId;
    let { userId } = req.body;

    try{
        let where = {
            id : commentId,
            userID : userId,
            mediaID : mediaId
        }
        
        let result = await Comment.destroy({ where : where } )
        
        
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
 * add userId on the array userLiked 
 */
exports.LIKE = async ( req, res ) => {
    console.log("comment like")
    let mediaId = req.params.id;
    let commentId = req.params.commentId;
    let userId = req.body.userId;
    let like = req.body.like == 0 || req.body.like == 1 ? parseInt(req.body.like) : undefined;
    
    if ( like != undefined ){

        try{

            let where = {
                id : commentId,
                userID : userId,
                mediaID : mediaId
            }
            
            let result = await Comment.findAll( { where : where } );
            
            if ( result.length != 0 ) {
    
                let comment = result[0].dataValues;
                
                switch(like){

                    case 1:
                        if ( comment.userLiked.indexOf(userId) === -1 ){

                            comment.userLiked.push(userId);

                        }
                        break;

                    case 0:
                        let index = comment.userLiked.indexOf(userId);
                        if ( index != -1 ){

                            comment.userLiked.splice(index, 1);

                        }

                    default:
                        //nothing
                        
                }

                let query = await Comment.update(
                        { userLiked : comment.userLiked},
                        { where : { id : commentId } }
                    )
               

                if (!query){
                    throw new Error();
                }

                res.status(200).json({ message : "Votre avis à bien été enregistré"})
    
    
            } else {
                res.status(400).json( { message : "commentaire inconnu." } );
            }
    
        } catch (err) {
    
            res.status(500).json( { message : "Une erreur est survenue." } );
    
        }

    } else {

        res.status(400).json( { message : "Vous aimez ou pas?" } );

    }
}

/**
 * set reported to true and add one to the total of reported
 */
exports.REPORTED = async ( req, res ) => {
    console.log("comment reported")
    let mediaId = req.params.id;  
    let commentId = req.params.commentId;  

    try{

        let where = {
            id : commentId,
            mediaID : mediaId
        }

        let result = await Comment.findAll( { where : where } );

        if ( result.length != 0 ) {

            let comment = result[0].dataValues;
            let reportedTotal = comment.userReported + 1;


            let query = await Comment.update(
                    { reported : true, userReported : reportedTotal },
                    { where : where }
                )
            
            
            if (!query){
                throw new Error();
            }

            res.status(200).json({ message : "Nous avons bien pris en compte votre signalement."})


        } else {
            res.status(400).json( { message : "commentaire inconnu." } );
        }

    } catch (err) {

        res.status(500).json( { message : "Une erreur est survenue." } );

    }
}