

const { response } = require('express');
const Media = require('../models/MediaModel');



exports.GET_ALL = ( req, res ) => {
    console.log("media GET_ALL")
    res.send("media GET_ALL")
}

exports.GET_ONE = ( req, res ) => {
    console.log("media GET_ONE")
    res.send("media GET_ONE")
}

exports.CREATE = ( req, res ) => {
    console.log("media CREATE")
    res.send("media create")
}

exports.UPDATE = ( req, res ) => {
    console.log("media update")
    res.send("media update")
}

exports.DELETE = ( req, res ) => {
    console.log("media delete")
    res.send("media delete")
}

exports.LIKE = ( req, res ) => {
    console.log("media like")
    res.send("media like")
}

exports.REPORTED = ( req, res ) => {
    console.log("media reported")
    res.send("media reported")
}