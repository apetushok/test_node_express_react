import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegisterInput, validateLoginInput, validate } from '../validators/authValidator.js';


const router = express.Router();

// POST /api/auth/register
router.post('/register', validateRegisterInput, validate, register);

// POST /api/auth/login
router.post('/login', validateLoginInput, validate, login);

export default router;
