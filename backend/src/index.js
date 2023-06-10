import { config } from 'dotenv';
config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';

// Create an Express app
const app = express();
app.use(cors());

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
	audience: 'https://dev-c6jfluhthfm1zyy1.us.auth0.com/api/v2/',
	issuerBaseURL: `https://dev-c6jfluhthfm1zyy1.us.auth0.com/`,
});

app.get('/api/public', (req, res) => {
	res.json({
		message: 'Public Test Endpoint',
	});
});

app.get('/api/test', checkJwt, (req, res) => {
	res.json({ message: 'Private API Endpoint, Token verified.' });
});

const checkScopes = requiredScopes('read:messages');

app.get('/api/private-scoped', checkJwt, checkScopes, function (req, res) {
	res.json({
		message:
			'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.',
	});
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
