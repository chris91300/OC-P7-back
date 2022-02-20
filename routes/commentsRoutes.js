const express = require('express');
const router = express.Router();
const { GET_ALL, GET_ONE, CREATE, UPDATE, LIKE, REPORTED } = require('../controllers/commentsController');
const verifyID = require('../utils/middlewares/verifyID');
const verifyCommentID = require('../utils/middlewares/verifyCommentID');
const verifyCommentData = require('../utils/middlewares/verifyCommentData');
const verifyIfUserExist = require('../utils/middlewares/verifyIfUserExist');
const verifyIfMediaExist = require('../utils/middlewares/verifyIfMediaExist');
const authorization = require('../utils/middlewares/authorization');

// in parameters, id is use for mediaId not commentId  

router.get('/:id', authorization, verifyID, GET_ALL);

router.post('/:id', authorization,  verifyID, verifyIfMediaExist, verifyCommentData, CREATE)

router.post('/:id/:commentId/reported', authorization,  verifyID, verifyCommentID, verifyIfUserExist, REPORTED);



/**
 * ROUTE NOT USE FOR THE MOMENT
 * CAN BE USE LATER IF NEEDED
 */
/*
router.get('/:id/:commentId', verifyID, verifyCommentID, GET_ONE);

router.put('/:id/:commentId/update', verifyID, verifyCommentID, verifyCommentData, UPDATE);

router.post('/:id/:commentId/like', verifyID, verifyCommentID, verifyIfUserExist, LIKE);
*/

module.exports = router;