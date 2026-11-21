const express = require('express');
const {getLeads,addLeads, getLeadById, updateLead, deleteLead } = require('../controllers/leadController');
const { authUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addleads',authUser,addLeads);
router.get('/leads',authUser,getLeads);
router.get('/:id',authUser,getLeadById);
router.put('/:id',authUser,updateLead);
router.delete('/:id',authUser,deleteLead);

module.exports= router;