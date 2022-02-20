const express = require('express');
const router = express.Router();
const { GET_MEDIAS_REPORTED, GET_COMMENTS_REPORTED } = require('../controllers/adminController');
const { DELETE : DELETE_MEDIA, REMOVE_REPORTED : MEDIA_REMOVE_REPORTED } = require('../controllers/mediasController');
const { DELETE : DELETE_COMMENT, REMOVE_REPORTED : COMMENT_REMOVE_REPORTED } = require('../controllers/commentsController');
const verifyIfUserIsAdmin = require("../utils/middlewares/verifyIfUserIsAdmin");
const authorization = require('../utils/middlewares/authorization');


router.get('/medias/reported',authorization, verifyIfUserIsAdmin, GET_MEDIAS_REPORTED); 

router.delete('/medias/:id/delete',authorization, verifyIfUserIsAdmin, DELETE_MEDIA); 

router.get('/medias/:id/remove_reported',authorization, verifyIfUserIsAdmin, MEDIA_REMOVE_REPORTED); 

router.get('/comments/reported',authorization, verifyIfUserIsAdmin, GET_COMMENTS_REPORTED); 

router.delete('/comments/:id/delete',authorization, verifyIfUserIsAdmin, DELETE_COMMENT);  

router.get('/comments/:id/remove_reported',authorization, verifyIfUserIsAdmin, COMMENT_REMOVE_REPORTED); 

module.exports = router;