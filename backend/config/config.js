export default {
	port: process.env.PORT || 3000,
	mode: process.env.NODE_ENV || 'production',
	database: {
		url: process.env.MONGODB_URI
	},
	jwtSecret: process.env.JWT_SECRET
};
