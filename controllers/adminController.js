

const { response } = require('express');
const Media = require('../models/MediaModel');
const User = require('../models/UserModel');
const path = require('path');
const fs = require('fs');
const Comment = require('../models/CommentModel');

exports.GET_MEDIAS_REPORTED = ( req, res )=>{
    console.log("get medias reported")

    res.status(200).json({message : "on est bien dans get medias reported"})
}


exports.GET_COMMENTS_REPORTED = ( req, res )=>{
    console.log("get comments reported")
    res.status(200).json({message : "on est bien dans get comments reported"})

}