const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * @param {*} user 
 * @returns {String} 
 */

const generateToken = (user) => {
    return jwt.sign(
        user,
        config.get('jwt_secret.access'),
        { expiresIn: '3600s' }
    );
}

module.exports = generateToken;