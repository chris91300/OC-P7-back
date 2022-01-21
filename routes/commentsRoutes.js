const express = require('express');
const router = express.Router();
const { GET_ALL, GET_ONE, CREATE, UPDATE, DELETE, LIKE, REPORTED } = require('../controllers/commentsController');


router.get('/:mediaId', GET_ALL);

router.get('/:mediaId/:commentId', GET_ONE);

router.post('/:mediaId', CREATE)

router.put('/:mediaId/update', UPDATE);

router.delete('/:mediaId/delete', DELETE);

router.post('/:mediaId/like', LIKE);

router.post('/:mediaId/reported', REPORTED);

module.exports = router;