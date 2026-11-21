const express = require('express');

const {RegisterUser, LoginUser, LogoutUser } = require('../controllers/authcontroller');
const { authUser } = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/register',RegisterUser);
router.post('/login',LoginUser);
router.get('/test-auth', authUser, (req,res)=>{
    return res.status(200).json({
        message: "Authentication Successfull",
        user: req.user
    });
});
router.post('/logout',LogoutUser);

module.exports = router;