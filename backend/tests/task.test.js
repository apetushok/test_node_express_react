import request from 'supertest';
import app from '../app.js';
import Task from '../models/Task.js';

describe('Task API', () => {
	let testTaskId;

	beforeEach( async () => {
		const newTask = new Task( { title: 'Test Task', description: 'Test Description' } );
		await newTask.save();
		testTaskId = newTask._id;
	} );

	describe( 'GET /api/tasks', () => {
		it( 'should get all tasks', async () => {
			const response = await request( app ).get( '/api/tasks' );
			expect( response.status ).toBe( 200 );
			expect( Array.isArray( response.body ) ).toBe( true );
			expect( response.body.length ).toBeGreaterThan( 0 );
		} );
	} );

	describe('GET /api/tasks/:taskId', () => {
		it('should get a task by ID', async () => {
			const response = await request(app).get(`/api/tasks/${testTaskId}`);
			expect(response.status).toBe(200);
			expect(response.body._id).toBe(testTaskId.toString());
		});

		it('should return 404 if task not found', async () => {
			const nonExistentTaskId = '5f6a0f9f1b7b730d68c89f9a';
			const response = await request(app).get(`/api/tasks/${nonExistentTaskId}`);
			expect(response.status).toBe(404);
		});
	});

	describe('POST /api/tasks', () => {
		it('should create a new task', async () => {
			const newTaskData = { title: 'New Task', description: 'New Description' };
			const response = await request(app).post('/api/tasks').send(newTaskData);
			expect(response.status).toBe(201);
			expect(response.body).toMatchObject(newTaskData);
		});
	});

	describe('PUT /api/tasks/:taskId', () => {
		it('should update an existing task by ID', async () => {
			const updatedTaskData = { title: 'Updated Title', description: 'Updated Description' };
			const response = await request(app).put(`/api/tasks/${testTaskId}`).send(updatedTaskData);
			expect(response.status).toBe(200);
			expect(response.body).toMatchObject(updatedTaskData);
		});

		it('should return 404 if task not found', async () => {
			const nonExistentTaskId = '5f6a0f9f1b7b730d68c89f9a';
			const response = await request(app).put(`/api/tasks/${nonExistentTaskId}`).send({});
			expect(response.status).toBe(404);
		});
	});

	describe('DELETE /api/tasks/:taskId', () => {
		it('should delete a task by ID', async () => {
			const response = await request(app).delete(`/api/tasks/${testTaskId}`);
			expect(response.status).toBe(200);
		});

		it('should return 404 if task not found', async () => {
			const nonExistentTaskId = '5f6a0f9f1b7b730d68c89f9a';
			const response = await request(app).delete(`/api/tasks/${nonExistentTaskId}`);
			expect(response.status).toBe(404);
		});
	});
});
