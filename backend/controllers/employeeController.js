const Employee = require('../models/Employee');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private/Admin
const getEmployees = async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i',
        },
    } : {};

    const employees = await Employee.find({ ...keyword });
    res.json(employees);
};

// @desc    Get employee by ID
// @route   GET /api/employees/:id
// @access  Private/Admin
const getEmployeeById = async (req, res) => {
    const employee = await Employee.findById(req.params.id);

    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
};

// @desc    Create a new employee
// @route   POST /api/employees
// @access  Private/Admin
const createEmployee = async (req, res) => {
    const { name, email, phone, department, status } = req.body;

    const employeeExists = await Employee.findOne({ email });

    if (employeeExists) {
        res.status(400).json({ message: 'Employee already exists' });
        return;
    }

    const employee = await Employee.create({
        name,
        email,
        phone,
        department,
        status,
    });

    if (employee) {
        res.status(201).json(employee);
    } else {
        res.status(400).json({ message: 'Invalid employee data' });
    }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private/Admin
const updateEmployee = async (req, res) => {
    const employee = await Employee.findById(req.params.id);

    if (employee) {
        employee.name = req.body.name || employee.name;
        employee.email = req.body.email || employee.email;
        employee.phone = req.body.phone || employee.phone;
        employee.department = req.body.department || employee.department;
        employee.status = req.body.status || employee.status;

        const updatedEmployee = await employee.save();
        res.json(updatedEmployee);
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private/Admin
const deleteEmployee = async (req, res) => {
    const employee = await Employee.findById(req.params.id);

    if (employee) {
        await employee.deleteOne();
        res.json({ message: 'Employee removed' });
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
};

module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
