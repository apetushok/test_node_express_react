import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import errorHandler from './utils/errorHandler.js';
import config from './config/config.js';

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.database.url).catch(err => {
	console.log(err)
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
if (process.env.NODE_ENV !== 'test') {
	app.listen( config.port, () => {
		console.log( `Server is running on port ${ config.port }` );
	} );
}

export default app;
