const errorHandler = (err, req, res, next) => {
	console.error(err.stack);

	if (res.headersSent) {
		return next(err);
	}

	res.status(err.status || 500).json({
		message: err.message || 'Internal Server Error'
	});
};

export default errorHandler;
