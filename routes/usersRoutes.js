const express = require('express');
const router = express.Router();
const { SIGNUP, LOGIN, UPDATE, DELETE, LIKE } = require('../controllers/usersController');
 

router.post('/signup', SIGNUP);


router.post('/login', LOGIN);


router.put('/:id/update', UPDATE);


router.delete('/:id/delete', DELETE);


module.exports = router;

