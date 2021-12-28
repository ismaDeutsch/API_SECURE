const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { handlErrors, createToken } = require('../utils/utils');


module.exports.register_get = (req, res) => {
    res.render('register');
}
  
module.exports.login_get = (req, res) => {
    res.render('login');
}
  
module.exports.register_post = async (req, res) => {
    const { email, pwd } = req.body;
    try {
        const user = await User.create({ email, pwd });
        const token = createToken(user._id);
        //res.cookie('auth', token, { httpOnly: true, maxAge: 24* 60* 60});
        
        res.status(200).send({ user: user._id, token });
    } catch (error) {
        const errors = handlErrors(error);
        res.status(400).json({ errors });
    }
}
  
module.exports.login_post = async (req, res) => {
    const { email, pwd } = req.body;
    try {
        const user = await User.login(email, pwd);
        const token = createToken(user._id);
        res.cookie('auth', token, { httpOnly: true, maxAge: 24* 60* 60});
        res.status(200).json({ user: user._id, token: token });
    } catch (error) {
        const errors = handlErrors(error);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('auth', '', { maxAge: 0 });
    res.redirect('/');
}

module.exports.user_get = async (req, res) => {
    const users = await User.find();
    res.render('user', { users: users });
}