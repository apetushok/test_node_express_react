import Task from '../models/Task.js';
import { NotFoundError } from '../errors/NotFoundError.js'

const taskService = {
	getAllTasks: async () => {
		const tasks = await Task.find();
		return tasks;
	},

	getTaskById: async (taskId) => {
		const task = await Task.findById(taskId);
		if (!task) {
			throw new NotFoundError('Task not found');
		}
		return task;
	},

	createTask: async (title, description) => {
		const newTask = new Task({ title, description });
		await newTask.save();
		return newTask;
	},

	updateTaskById: async (taskId, title, description, completed) => {
		const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description, completed }, { new: true });
		if (!updatedTask) {
			throw new NotFoundError('Task not found');
		}
		return updatedTask;
	},

	deleteTaskById: async (taskId) => {
		const deletedTask = await Task.findByIdAndDelete(taskId);
		if (!deletedTask) {
			throw new NotFoundError('Task not found');
		}
		return deletedTask;
	}
};

export default taskService;
