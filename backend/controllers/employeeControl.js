const Employee = require('../models/employeeModel');

// Get all appointments
exports.getAll = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json({ msg: 'Employee created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.employeeId);
        res.status(200).json({ msg: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get one employee
exports.getOne = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.employeeId);
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
    try {
        const { employeeId, employeename, phone, jobrole, basicsalary, month, bonus, totsalary } = req.body;

        const employee = await Employee.findByIdAndUpdate(
            req.params.employeeId,
            {
                employeeId,
                employeename,
                phone,
                jobrole,
                basicsalary,
                month,
                bonus,
                totsalary
            },
            { new: true } // returns the updated document
        );

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ msg: 'Employee updated successfully', employee });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};