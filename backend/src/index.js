import { config } from 'dotenv';
config();
import express from 'express';
import { expressjwt as jwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import cors from 'cors';
import mongoose from 'mongoose';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';

// Create an Express app
const app = express();
app.use(cors());

const authConfig = {
	domain: 'dev-c6jfluhthfm1zyy1.us.auth0.com',
	audience: 'https://dev-c6jfluhthfm1zyy1.us.auth0.com/api/v2/',
};

const jwtCheck = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
	}),
	audience: authConfig.audience,
	issuer: `https://${authConfig.domain}/`,
	algorithms: ['RS256'],
});

app.use(jwtCheck);

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
// const checkJwt = auth({
// 	audience: 'https://dev-c6jfluhthfm1zyy1.us.auth0.com/api/v2/',
// 	issuerBaseURL: `https://dev-c6jfluhthfm1zyy1.us.auth0.com/`,
// });

app.get('/api/public', (req, res) => {
	res.json({
		message: 'Public Test Endpoint',
	});
});

app.get('/api/test', (req, res) => {
	res.json({ message: 'Private API Endpoint, Token verified.' });
});

const checkScopes = requiredScopes('read:messages');

app.get('/api/private-scoped', checkScopes, function (req, res) {
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
