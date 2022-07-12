const express = require('express');
const cors = require('cors');
const config = require('config');
const mongoose = require('mongoose');

const moviesRouter = require('./routes/moviesRouter.js');
const userRouter = require('./routes/userRouter.js');

const connect = require('./helpers/dbConnect.js');

const app = express();

connect();
mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB");
})
mongoose.connection.on("error", error => {
    "Connection to MongoDB has failed", error.message
})

app.use(express.json());

app.use(cors());

app.use('/api', moviesRouter);

app.use('/user', userRouter);

const PORT = config.get('app.server_port') || 6000;

app.listen(PORT, () => {
    console.log(`Start...Server is running successfully on port ${PORT}`);
})
