import { loginUser, registerUser } from '../services/authService.js'

// Register a new user
export const register = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const token = await registerUser(username, email, password);

		res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
		console.error('Authentication failed:', error);
		res.status(401).json({ message: 'Authentication failed' });
	}
};

// Login user
export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const token = await loginUser(email, password);

		res.status(200).json({ token });
	} catch (error) {
		console.error('Authentication failed:', error);
		res.status(401).json({ message: 'Authentication failed' });
	}
};
