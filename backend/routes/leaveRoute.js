const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

router.post('/apply', leaveController.applyLeave);
router.get('/getall', leaveController.getAllLeaves);
router.get('/getone/:id', leaveController.getOne); // Updated route parameter
router.delete('/delete/:id', leaveController.deleteLeave); // Updated route parameter
router.put('/approve/:id', leaveController.approveLeave);
router.put('/reject/:id', leaveController.rejectLeave);


module.exports = router;
