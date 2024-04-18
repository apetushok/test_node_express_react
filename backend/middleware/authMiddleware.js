import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
	const token = req.header('Authorization');

	if (!token) {
		return res.status(401).json({ message: 'No token, authorization denied' });
	}

	try {
		const decoded = jwt.verify(token, config.jwtSecret);
		const user = await User.findById(decoded.id);

		if (!user) {
			return res.status(401).json({ message: 'Invalid token, user not found' });
		}

		req.user = user;
		next();
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			res.status(500).json({ message: 'Auth token expired', code: 1 });
		} else {
			res.status(500).json({ message: 'Server error' });
		}
	}
};

export default authMiddleware;
