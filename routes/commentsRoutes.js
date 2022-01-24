const express = require('express');
const router = express.Router();
const { GET_ALL, GET_ONE, CREATE, UPDATE, DELETE, LIKE, REPORTED } = require('../controllers/commentsController');
const verifyID = require('../utils/middlewares/verifyID');
const verifyCommentID = require('../utils/middlewares/verifyCommentID');
const verifyCommentData = require('../utils/middlewares/verifyCommentData');

// in parameters, id is use for mediaId not commentId

router.get('/:id', verifyID, GET_ALL);

router.get('/:id/:commentId', verifyID, verifyCommentID, GET_ONE);

router.post('/:id', verifyID, verifyCommentData, CREATE)

router.put('/:id/:commentId/update', verifyID, verifyCommentID, verifyCommentData, UPDATE);

router.delete('/:id/:commentId/delete', verifyID, verifyCommentID, DELETE);

router.post('/:id/:commentId/like', verifyID, verifyCommentID, LIKE);

router.post('/:id/:commentId/reported', verifyID, verifyCommentID, REPORTED);

module.exports = router;