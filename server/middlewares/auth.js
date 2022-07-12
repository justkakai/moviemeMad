const jwt = require('jsonwebtoken');
const config = require('config');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: 'token not found' });

    jwt.verify(
        token,
        config.get('jwt_secret.access'),
        (err, user) => {
            if (err) return res.status(403).json({ message: 'Access Forbidden :(' });
            req.user = user;
            next();
        }
    );
}

module.exports = authenticateToken;