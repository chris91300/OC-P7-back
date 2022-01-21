
const { response } = require('express');
const Comment = require('../models/CommentModel');



exports.GET_ALL = ( req, res ) => {
    console.log("comment GET_ALL")
    res.send("comment GET_ALL")
}

exports.GET_ONE = ( req, res ) => {
    console.log("comment GET_ONE")
    res.send("comment GET_ONE")
}

exports.CREATE = ( req, res ) => {
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