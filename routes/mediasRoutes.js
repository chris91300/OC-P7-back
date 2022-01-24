const express = require('express');
const router = express.Router();
const { GET_ALL, GET_ONE, CREATE, UPDATE, DELETE, LIKE, REPORTED } = require('../controllers/mediasController');
const verifyID = require('../utils/middlewares/verifyID');
const upload = require('../utils/middlewares/upload');
const verifyMediaData = require('../utils/middlewares/verifyMediaData');
const verifyMediaUserId = require('../utils/middlewares/verifyMediaUserId');
const canIDo = require('../utils/middlewares/canIDo');


router.get('/', GET_ALL); 

router.get('/:id', verifyID, GET_ONE);

router.post('/create', upload, verifyMediaData, CREATE)

router.put('/:id/update', verifyID, upload, verifyMediaData, canIDo, UPDATE);

router.delete('/:id/delete', verifyID, canIDo,  DELETE);

router.post('/:id/like', verifyID, verifyMediaUserId, LIKE);

router.post('/:id/reported', verifyID, verifyMediaUserId,  REPORTED);

module.exports = router;