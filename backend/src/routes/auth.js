import jwt from 'jsonwebtoken';
import express from 'express';
import passport from 'passport';
import '../config/passport.js';
import 'dotenv/config';

const router = express.Router();

router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile'],
	})
);

router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/failedLogin',
		session: false,
	}),
	(req, res) => {
		res.redirect('http://localhost:5173/');
		const token = jwt.sign(
			{ user: { email: req.user.email }, id: req.user._id },
			process.env.JWT_SECRET_KEY
		);
		console.log(token);
		res.json({ token });
	}
);

export default router;
