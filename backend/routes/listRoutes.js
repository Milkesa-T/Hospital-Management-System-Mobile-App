const express = require('express');
const router = express.Router();
const { getLists } = require('../controllers/listController');

const { protect } = require('../middleware/auth');

router.post('/fetch', protect, getLists);

module.exports = router;
