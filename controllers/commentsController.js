
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

exports.CREATE = async ( req, res ) => {
    console.log("comment CREATE")
    res.send("comment create")
}

exports.UPDATE = ( req, res ) => {
    console.log("comment update")
    res.send("comment update")
}

exports.DELETE = ( req, res ) => {
    console.log("comment delete")
    res.send("comment delete")
}

exports.LIKE = ( req, res ) => {
    console.log("comment like")
    res.send("comment like")
}

exports.REPORTED = ( req, res ) => {
    console.log("comment reported")
    res.send("comment reported")
}