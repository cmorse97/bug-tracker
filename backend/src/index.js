import { config } from 'dotenv';
config();
import express from 'express';
import { expressjwt as jwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import jwtCheck from './middleware/auth0Middleware.js';
import cors from 'cors';
import mongoose from 'mongoose';

// Create an Express app
const app = express();
app.use(cors());

app.use(jwtCheck);

app.get('/api/public', (req, res) => {
	res.json({
		message: 'Public Test Endpoint',
	});
});

app.get('/api/test', (req, res) => {
	res.json({ message: 'Private API Endpoint, Token verified.' });
});

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((x) => {
		console.log(
			`Connected to Mongo! Database name: "${x.connections[0].name}"`
		);
	})
	.catch((err) => {
		console.log('Error connecting to mongo', err);
	});

app.listen(process.env.PORT || 3000, () => {
	console.log(`Running app on port ${process.env.PORT || '3000'}`);
});
