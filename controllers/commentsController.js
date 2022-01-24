
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
            userID : userId,
            mediaID : mediaId,
            text : text
        };

        let result = await Comment.create(data)
        
        if (result) {

            res.status(201).json( { message : "Commentaire ajouté." } );

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
    res.send("comment delete")
}

/**
 * add userId on the array userLiked 
 */
exports.LIKE = async ( req, res ) => {
    console.log("comment like")
    res.send("comment like")
}

/**
 * set reported to true and add one to the total of reported
 */
exports.REPORTED = async ( req, res ) => {
    console.log("comment reported")
    res.send("comment reported")
}