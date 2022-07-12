const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const generateToken = require('../helpers/generateToken.js');
const User = require('../models/User.js');

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name, 
        email, 
        password: hashedPassword,
        createdAt: new Date()
    })

    const payload = {
        id: user._id,
        name: user.name
    }

    const token = generateToken(payload);

    res.json({token: token});
}

const login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findByEmail(email);

    if (!user) return res.status(404).json({
        message: `Either email or password is not correct !!!`
    });

    if (!password) {
        return res.status(400).json({ message: 'Either email or password is not correct !!!' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(404).json({
            message: `Either email or password is not correct !!!`
        });
    };

    const token = generateToken({ id: user._id, name: user.name });

    res.status(200).json({
        token: token,
        message: 'you are logged in !!!'
    });
}

module.exports = { register, login };
