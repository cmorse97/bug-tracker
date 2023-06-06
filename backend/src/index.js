import { config } from 'dotenv';
config();
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import router from './routes/auth.js';
import jwt from 'jsonwebtoken';

// require('./controllers/controller.tokenJWT');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', router);

app.get('/OAuthRedirecting', (req, res) => {
	res.send('token passed successfully');
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
