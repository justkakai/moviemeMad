const express = require('express');
const cors = require('cors');
const config = require('config');

const moviesRouter = require('./routes/moviesRouter.js');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', moviesRouter)

const PORT = config.get('app.port') || 5007;

app.listen(PORT, () => {
    console.log(`Start...Server is running successfully on port ${PORT}`);
})
