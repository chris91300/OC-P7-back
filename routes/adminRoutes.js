const express = require('express');
const router = express.Router();
const {
    GET_MEDIAS_REPORTED,
    GET_COMMENTS_REPORTED,
    DELETE_MEDIA,
    REMOVE_REPORTED_MEDIA,
    REMOVE_REPORTED_COMMENT,
    DELETE_COMMENT } = require('../controllers/adminController');

const verifyIfUserIsAdmin = require("../utils/middlewares/verifyIfUserIsAdmin");
const authorization = require('../utils/middlewares/authorization');


router.get('/medias/reported',authorization, verifyIfUserIsAdmin, GET_MEDIAS_REPORTED); 

router.get('/medias/:id/remove_reported',authorization, verifyIfUserIsAdmin, REMOVE_REPORTED_MEDIA);

router.delete('/medias/:id/delete',authorization, verifyIfUserIsAdmin, DELETE_MEDIA); 
 

router.get('/comments/reported',authorization, verifyIfUserIsAdmin, GET_COMMENTS_REPORTED); 

router.get('/comments/:id/remove_reported',authorization, verifyIfUserIsAdmin, REMOVE_REPORTED_COMMENT); 

router.delete('/comments/:id/delete',authorization, verifyIfUserIsAdmin, DELETE_COMMENT);  

module.exports = router;