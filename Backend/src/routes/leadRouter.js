const express = require('express');
const {getLeads,addLeads } = require('../controllers/leadController');
const { authUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addleads',authUser,addLeads);
router.get('/leads',authUser,getLeads);

module.exports= router;