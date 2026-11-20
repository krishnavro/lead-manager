const express = require('express');

const {RegisterUser, LoginUser } = require('../controllers/authcontroller');

const router = express.Router();

router.post('/register',RegisterUser);
router.get('/login',LoginUser)

module.exports = router;