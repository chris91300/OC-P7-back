const express = require('express');
const router = express.Router();
const { GET_ALL, GET_ONE, CREATE, UPDATE, DELETE, LIKE, REPORTED } = require('../controllers/mediasController');


router.get('/', GET_ALL);

router.get('/:id', GET_ONE);

router.post('/create', CREATE)

router.put('/:id/update', UPDATE);

router.delete('/:id/delete', DELETE);

router.post('/:id/like', LIKE);

router.post('/:id/reported', REPORTED);

module.exports = router;