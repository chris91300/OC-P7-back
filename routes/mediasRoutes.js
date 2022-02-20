const express = require('express');
const router = express.Router();
const { GET_ALL, GET_ONE, CREATE, UPDATE, DELETE, LIKE, REPORTED } = require('../controllers/mediasController');
const verifyID = require('../utils/middlewares/verifyID');
const upload = require('../utils/middlewares/upload');
const verifyMediaData = require('../utils/middlewares/verifyMediaData');
const verifyIfUserExist = require('../utils/middlewares/verifyIfUserExist');
const canIDo = require('../utils/middlewares/canIDo');
const resize = require('../utils/middlewares/resize');
const authorization = require('../utils/middlewares/authorization');


router.get('/', authorization, GET_ALL); 

router.post('/create', authorization , upload, verifyMediaData, resize, CREATE)

router.post('/:id/like', authorization ,  verifyID, verifyIfUserExist, LIKE);

router.post('/:id/reported', authorization ,  verifyID, verifyIfUserExist,  REPORTED);



router.get('/:id', verifyID, GET_ONE);//    pas utilisé

router.put('/:id/update', verifyID, upload, verifyMediaData, canIDo, resize, UPDATE);//    pas utilisé

router.delete('/:id/delete', verifyID, canIDo,  DELETE);//    pas utilisé

module.exports = router;