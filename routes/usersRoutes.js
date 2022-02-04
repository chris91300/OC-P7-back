const express = require('express');
const router = express.Router();
const { SIGNUP, LOGIN, UPDATE, DELETE, LIKE } = require('../controllers/usersController');
const verifySignupUserData = require('../utils/middlewares/verifySignupUserData');
const verifyLoginUserData = require('../utils/middlewares/verifyLoginUserData');
const verifyID = require('../utils/middlewares/verifyID');
const verifyUpdateUserData = require('../utils/middlewares/verifyUpdateUserData');
const createUrlProfil = require('../utils/middlewares/createUrlProfil');
 

router.post('/signup', verifySignupUserData, createUrlProfil, SIGNUP);


router.post('/login',verifyLoginUserData, LOGIN);


router.put('/:id/update', verifyID, verifyUpdateUserData, UPDATE);


router.delete('/:id/delete', verifyID, DELETE);


module.exports = router;

