import express from 'express';
import { getAllTasks, getTaskById, createTask, updateTaskById, deleteTaskById } from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes in this router
//router.use(authMiddleware);

// GET /api/tasks
router.get('/', getAllTasks);

// GET /api/tasks/:id
router.get('/:id', getTaskById);

// POST /api/tasks
router.post('/', createTask);

// PUT /api/tasks/:id
router.put('/:id', updateTaskById);

// DELETE /api/tasks/:id
router.delete('/:id', deleteTaskById);

export default router;
