

const { response } = require('express');
const Media = require('../models/MediaModel');
const User = require('../models/UserModel');
const path = require('path');
const fs = require('fs');
const Comment = require('../models/CommentModel');

exports.GET_MEDIAS_REPORTED = async ( req, res )=>{
    console.log("get medias reported")
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


exports.GET_COMMENTS_REPORTED = async ( req, res )=>{
    console.log("get comments reported")
    try{
        
        //voir pourquoi il inclut uniquement user et pas media
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