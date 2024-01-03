const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')

// @desc Authenticate a user
// @router POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	// Check for user email
	const user = await User.findOne({ email })

	// Compare user input password with hashed password
	if (user && (await bcrypt.compare(password, user.password))) {
		const tokens = generateTokens(user._id)

		// Set refresh token as an HTTPonly cookie
		res.cookie('refreshToken', tokens.refreshToken, {
			secure: true,
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000
		})

		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: tokens.jwtToken
		})
	} else {
		res.status(400)
		throw new Error('Invalid Credentials')
	}
})

// @desc Register new user
// @router POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	if (!name || !email || !password) {
		res.status(400)
		throw new Error('Please input all fields')
	}

	// Check if user exists
	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('User already exists')
	}

	// Hash password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	// Create user
	const user = await User.create({
		name,
		email,
		password: hashedPassword
	})

	if (user) {
		const tokens = generateTokens(user._id)

		// Set refresh token as an HTTPonly cookie
		res.cookie('refreshToken', tokens.refreshToken, {
			secure: true,
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000
		})

		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: tokens.jwtToken
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

// @desc Get user data
// @router GET /api/users/:id
// @access Private
const getUser = asyncHandler(async (req, res) => {
	const { _id, name, email } = await User.findById(req.user.id)

	res.status(200).json({
		id: _id,
		name,
		email
	})
})

// Generate JWT
const generateTokens = id => {
	const jwtToken = jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '1h'
	})

	const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '7d'
	})

	return { jwtToken, refreshToken }
}

module.exports = {
	loginUser,
	registerUser,
	getUser
}
