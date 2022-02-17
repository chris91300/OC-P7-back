const express = require('express');
const router = express.Router();
const { SIGNUP, LOGIN, UPDATE_PASSWORD, DELETE, UPDATE_PICTURE } = require('../controllers/usersController');
const verifySignupUserData = require('../utils/middlewares/verifySignupUserData');
const verifyLoginUserData = require('../utils/middlewares/verifyLoginUserData');
const verifyID = require('../utils/middlewares/verifyID');
const verifyUpdateUserData = require('../utils/middlewares/verifyUpdateUserData');
const createUrlProfil = require('../utils/middlewares/createUrlProfil');
const uploadProfil = require('../utils/middlewares/uploadProfil');
const authorization = require('../utils/middlewares/authorization');
 

router.post('/signup', verifySignupUserData, createUrlProfil, SIGNUP);


router.post('/login',verifyLoginUserData, LOGIN);


router.put('/:id/update/password', verifyID, verifyUpdateUserData, UPDATE_PASSWORD);

router.put('/:id/update/picture', authorization, verifyID, uploadProfil , UPDATE_PICTURE);


router.delete('/:id/delete',authorization, verifyID, DELETE);


module.exports = router;

