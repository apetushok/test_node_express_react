import request from 'supertest';
import app from '../app.js';
import User from '../models/User.js';

describe('Authentication API', () => {
	// Test user credentials
	const testUser = {
		username: "test",
		email: 'test@example.com',
		password: 'testpassword'
	};

	describe('POST /api/auth/register', () => {
		it('should register a new user', async () => {
			const response = await request(app)
				.post('/api/auth/register')
				.send(testUser);
			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty( 'message');
			expect(response.body.message).toBe( "User registered successfully");
		});

		it('should return 422 if email is missing', async () => {
			const { email, ...invalidUser } = testUser;
			const response = await request(app)
				.post('/api/auth/register')
				.send(invalidUser);
			expect(response.status).toBe(422);
		});
	});

	describe('POST /api/auth/login', () => {
		it('should authenticate a user with valid credentials', async () => {
			const response = await request(app)
				.post('/api/auth/login')
				.send(testUser);
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('token');
		});

		it('should return 422 if email is missing', async () => {
			const { email, ...invalidUser } = testUser;
			const response = await request(app)
				.post('/api/auth/login')
				.send(invalidUser);
			expect(response.status).toBe(422);
		});
	});

	afterAll(async () => {
		if (testUser) {
			await User.deleteOne( {email: 'test@example.com'} );
		}
	});
});
