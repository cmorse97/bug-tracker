const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			// Get token from header
			token = req.headers.authorization.split(' ')[1]

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			// Get user from the token
			req.user = await User.findById(decoded.id).select('-password')

			next()
		} catch (error) {
			console.log(error)
			if (error.name === 'TokenExpiredError') {
				// If token is expired, attempt to refresh it
				try {
					const refreshToken = req.cookies.refreshToken // assuming you set refreshToken as a cookie
					if (refreshToken) {
						// Refresh the token
						const newToken = jwt.sign(
							{ id: decoded.id },
							process.env.JWT_SECRET,
							{
								expiresIn: '1h'
							}
						)

						// Update the JWT token in the request headers
						req.headers.authorization = `Bearer ${newToken}`

						// Retry the original operation with the new token
						return protect(req, res, next)
					}
				} catch (refreshError) {
					console.error('Error refreshing token:', refreshError.message)
				}
			}

			res.status(401)
			throw new Error('Not authorized')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorized, no token')
	}
})

module.exports = protect
