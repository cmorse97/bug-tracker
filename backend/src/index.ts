import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import User from './models/User';

const PORT = 8000;

const app = express();

// Tell Express to use middleware function
app.use(express.json());

app.post('/projects', async (req: Request, res: Response) => {
	console.log(req.body);
	const newUser = new User({
		title: req.body.title,
	});
	const createdUser = await newUser.save();
	res.json(createdUser);
});

mongoose
	.connect(
		'mongodb+srv://cm:cm@bugtracker.iqzigmx.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log(`listening on port ${PORT}`);
		app.listen(PORT);
	});
