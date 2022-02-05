const express = require('express');
const router = express.Router();
const { CHECK_SESSION } = require('../controllers/sessionController');


router.get('/', CHECK_SESSION); 

module.exports = router;