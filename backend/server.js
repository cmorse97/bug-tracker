const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT;

const app = express();

app.use('/api/projects', require('./routes/projectRoutes'));

app.listen(port, () => console.log(`Server started on port: ${port}`));
