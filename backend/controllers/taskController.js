import taskService from '../services/taskService.js';
import { NotFoundError } from '../errors/NotFoundError.js';

// Get all tasks
export const getAllTasks = async (req, res) => {
	try {
		const tasks = await taskService.getAllTasks();
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get a single task by ID
export const getTaskById = async (req, res) => {
	const { id } = req.params;

	try {
		const task = await taskService.getTaskById(id);
		res.status(200).json(task);
	} catch (error) {
		if (error instanceof NotFoundError) {
			res.status(404).json({ message: 'Task not found' });
		} else {
			res.status(500).json({ message: error.message });
		}
	}
};

// Create a new task
export const createTask = async (req, res) => {
	const { title, description } = req.body;

	try {
		const newTask = await taskService.createTask(title, description);
		res.status(201).json(newTask);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

// Update a task by ID
export const updateTaskById = async (req, res) => {
	const { id } = req.params;
	const { title, description, completed } = req.body;

	try {
		const updatedTask = await taskService.updateTaskById(id, title, description, completed);
		res.status(200).json(updatedTask);
	} catch (error) {
		if (error instanceof NotFoundError) {
			res.status(404).json({ message: 'Task not found' });
		} else {
			res.status(500).json({ message: error.message });
		}
	}
};

// Delete a task by ID
export const deleteTaskById = async (req, res) => {
	const { id } = req.params;

	try {
		await taskService.deleteTaskById(id)
		res.status(200).json({ message: 'Task deleted successfully' });
	} catch (error) {
		if (error instanceof NotFoundError) {
			res.status(404).json({ message: 'Task not found' });
		} else {
			res.status(500).json({ message: error.message });
		}
	}
};
