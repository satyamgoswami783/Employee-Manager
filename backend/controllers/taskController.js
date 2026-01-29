const Task = require('../models/Task');
const Employee = require('../models/Employee');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private/Admin
const getTasks = async (req, res) => {
    let tasks;
    if (req.user.isAdmin) {
        tasks = await Task.find({}).populate('assignedTo', 'name email');
    } else {
        const employee = await Employee.findOne({ email: req.user.email });
        if (employee) {
            tasks = await Task.find({ assignedTo: employee._id }).populate('assignedTo', 'name email');
        } else {
            tasks = [];
        }
    }
    res.json(tasks);
};

// @desc    Get task by ID
// @route   GET /api/tasks/:id
// @access  Private/Admin
const getTaskById = async (req, res) => {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name email');

    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private/Admin
const createTask = async (req, res) => {
    const { title, description, assignedTo, priority, deadline, status } = req.body;

    const task = await Task.create({
        title,
        description,
        assignedTo,
        priority,
        deadline,
        status,
    });

    if (task) {
        res.status(201).json(task);
    } else {
        res.status(400).json({ message: 'Invalid task data' });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private/Admin
const updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.assignedTo = req.body.assignedTo || task.assignedTo;
        task.priority = req.body.priority || task.priority;
        task.deadline = req.body.deadline || task.deadline;
        task.status = req.body.status || task.status;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
