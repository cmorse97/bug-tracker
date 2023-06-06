import { config } from 'dotenv';
config();

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';
import User from '../models/User.js';

const passportConfig = passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:8000/auth/google/callback',
		},
		async (accessToken, refreshToken, profile, done) => {
			console.log(profile);

			// check if user already exists
			const currentUser = await User.findOne({ googleId: profile.id });
			if (currentUser) {
				// already have the user -> return (login)
				return done(null, currentUser);
			} else {
				// register user and return
				const newUser = await new User({
					displayName: profile.displayName,
					googleId: profile.id,
				}).save();
				return done(null, newUser);
			}
		}
	)
);

export default passportConfig;
