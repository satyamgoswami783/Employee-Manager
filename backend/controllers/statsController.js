const Employee = require('../models/Employee');
const Task = require('../models/Task');

// @desc    Get dashboard stats
// @route   GET /api/stats
// @access  Private/Admin
const getStats = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();
        const totalTasks = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({ status: 'Pending' });
        const completedTasks = await Task.countDocuments({ status: 'Completed' });

        res.json({
            totalEmployees,
            totalTasks,
            pendingTasks,
            completedTasks,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getStats };
