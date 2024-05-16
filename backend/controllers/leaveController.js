const Leave = require('../models/leaveModel');

exports.applyLeave = async (req, res) => {
    try {
        // Assuming req.body contains the necessary fields including status
        const { employeeId, employeename, jobrole, leaveType, leavefrom,leaveto, description, status } = req.body;
        
        // Validate status value against enum values if needed
        
        // Create a new leave object
        const leave = new Leave({
            employeeId,
            employeename,
            jobrole,
            leaveType,
            leavefrom,
            leaveto,
            description,
            status // Ensure that status is one of the valid enum values
        });

        // Save the leave object to the database
        await leave.save();

        res.status(201).json({ msg: 'Leave request was successfully applied' });
    } catch (error) {
        console.error('Error applying leave:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find();
        res.status(200).json(leaves);
    } catch (error) {
        console.error('Error retrieving leaves:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// Delete an leaves
exports.deleteLeave = async (req, res) => {
    try {
        await Leave.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: 'Leave deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get one leave
exports.getOne = async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id);
        res.status(200).json(leave);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
// PUT to approve leave by ID
exports.approveLeave = async (req, res) => {
    try {
      const leave = await Leave.findById(req.params.id);
      if (!leave) {
        return res.status(404).json({ message: 'Leave not found' });
      }
      leave.status = 'Approved';
      await leave.save();
      res.json(leave);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // PUT to reject leave by ID
  exports.rejectLeave = async (req, res) => {
    try {
      const leave = await Leave.findById(req.params.id);
      if (!leave) {
        return res.status(404).json({ message: 'Leave not found' });
      }
      leave.status = 'Rejected';
      await leave.save();
      res.json(leave);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
