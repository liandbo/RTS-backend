//dotenv
require('dotenv').config();

//connect to db
const {connectDB} = require('./src/configs/db');

connectDB();

const express = require('express');
const cors = require('cors');

//route
const authRoute = require('./src/routes/authRoute');
const dataRoute = require('./src/routes/dataRoute');
const filesRoute = require('./src/routes/filesRoute');

// import errorHandler
const {errorHandler} = require('./src/middlewares/errorHandler');

const app = express();

// Cors
app.use(cors());

//Body Parsers
app.use(express.json()); 

// Mount the route
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/ticket', dataRoute);
app.use('/api/v1/files', filesRoute);

app.all('*', (req, res, next) => {
    const err = new Error('The route cannot be found');
    err.statusCode = 404;
    next(err);
});
app.use(errorHandler);

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`); 
});