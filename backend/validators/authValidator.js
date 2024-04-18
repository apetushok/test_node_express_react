import { body, validationResult } from 'express-validator';

export const validateRegisterInput = [
	body('username').notEmpty().withMessage('Username is required'),
	body('email').isEmail().withMessage('Invalid email format'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

export const validateLoginInput = [
	body('email').isEmail().withMessage('Invalid email format'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

export const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}

	const extractedErrors = [];
	errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

	return res.status(422).json({
		errors: extractedErrors
	});
};
