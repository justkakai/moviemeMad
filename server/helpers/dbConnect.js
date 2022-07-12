const mongoose = require('mongoose');
const config = require('config');

const connect = async () => {
    try {
        await mongoose.connect(config.get('db.uri')), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connect;