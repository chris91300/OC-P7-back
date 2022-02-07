const express = require('express');
const router = express.Router();
const { GET_MEDIAS_REPORTED, GET_COMMENTS_REPORTED } = require('../controllers/adminController');
const verifyIfUserIsAdmin = require("../utils/middlewares/verifyIfUserIsAdmin");


router.get('/medias/reported', verifyIfUserIsAdmin, GET_MEDIAS_REPORTED); 

router.get('/comments/reported', verifyIfUserIsAdmin, GET_COMMENTS_REPORTED); 

module.exports = router;