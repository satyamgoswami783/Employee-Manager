const express = require('express');
const router = express.Router();
const {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');
const { protect, admin } = require('../middleware/authMiddleware');


router.route('/').get(protect, getTasks).post(protect, admin, createTask);
router
    .route('/:id')
    .get(protect, admin, getTaskById)
    .put(protect, admin, updateTask)
    .delete(protect, admin, deleteTask);

module.exports = router;
