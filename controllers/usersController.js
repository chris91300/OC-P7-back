//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const { response } = require('express');
const User = require('../models/UserModel');


/**
 * user s'enregistre
 */
exports.SIGNUP = ( req, res ) => {
    console.log("user signup")
    res.send("user signup")
}

/**
 * user se connecte
 */
exports.LOGIN = ( req, res ) => {
    console.log("user login")
    res.send("user login")
}

/**
 * user modifie son profil
 */
exports.UPDATE = ( req, res ) => {
    console.log("user update")
    res.send("user update")
}

/**
 * user supprime son profil
 */
exports.DELETE = ( req, res ) => {
    console.log("user delete")
    res.send("user delete")
}

