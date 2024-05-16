const express = require('express');
const router = express.Router();
const appointmentControl = require('../controllers/appointmentControl');

router.get('/getall', appointmentControl.getAll);
router.get('/getone/:id', appointmentControl.getOne);
router.post('/create', appointmentControl.createAppointment);
router.put('/update/:id', appointmentControl.updateAppointment);
router.delete('/delete/:id', appointmentControl.deleteAppointment);
router.put('/approve/:id', appointmentControl.approveAppointment);
router.put('/reject/:id', appointmentControl.rejectAppointment);


module.exports = router;



