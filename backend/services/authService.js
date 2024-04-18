import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import User from '../models/User.js';

// Register a new user
export const registerUser = async (username, email, password) => {
	// Check if the user already exists
	let existingUser = await User.findOne({ email });
	if (existingUser) {
		throw new Error('User already exists');
	}

	// Hash the password
	const hashedPassword = await bcrypt.hash(password, 10);

	// Create a new user
	const newUser = new User({ username, email, password: hashedPassword });
	await newUser.save();

	return newUser;
};

// Login user
export const loginUser = async (email, password) => {
	// Find user by email
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error('Invalid credentials');
	}

	// Validate password
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error('Invalid credentials');
	}

	// Create JWT token
	const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });

	return token;
};
