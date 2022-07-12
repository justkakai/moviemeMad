const express = require('express');

const { register, login } = require('../controllers/userControllers.js');
const { check } = require('express-validator');
const authenticateToken = require('../middlewares/auth.js');

const User = require('../models/User.js');

const router = express.Router();


/**
 * @route GET /users
 * @description Get user data
 * @access Private
 */

router.get('/all', authenticateToken, async (req, res) => {
    const { email } = req.body;
    const userResult = await User.find({ email: email });
    res.status(200).json(userResult);
});


/**
 * @route POST /register
 * @desc  Register a user
 */
router.post('/register',
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }), 
    register
);


/**
 * @route POST /login
 * @description Let user log in
 * @access Public
 */

router.post('/login', login);


module.exports = router;