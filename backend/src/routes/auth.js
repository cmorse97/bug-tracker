import jwt from 'jsonwebtoken';
import express from 'express';
import passport from 'passport';
import '../config/passport.js';
import 'dotenv/config';

const router = express.Router();
const baseFrontendUrl = process.env.FRONTEND_URL;

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
	function (req, res) {
		const token = jwt.sign(
			{ user: { email: req.user.email }, id: req.user._id },
			process.env.JWT_SECRET_KEY
		);
		res.redirect(`${baseFrontendUrl}/OAuthRedirecting?token=${token}`);
		console.log(token);
	}
);

export default router;
