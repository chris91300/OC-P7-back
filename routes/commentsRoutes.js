const express = require('express');
const router = express.Router();
const { GET_ALL, GET_ONE, CREATE, UPDATE, DELETE, LIKE, REPORTED } = require('../controllers/commentsController');
const verifyID = require('../utils/middlewares/verifyID');
const verifyCommentID = require('../utils/middlewares/verifyCommentID');

// in parameters, id is use for mediaId not commentId

router.get('/:id', verifyID, GET_ALL);

router.get('/:id/:commentId', verifyID, verifyCommentID, GET_ONE);

router.post('/:id', verifyID, CREATE)

router.put('/:id/update', verifyID, UPDATE);

router.delete('/:id/delete', verifyID, DELETE);

router.post('/:id/like', verifyID,LIKE);

router.post('/:id/reported', verifyID, REPORTED);

module.exports = router;