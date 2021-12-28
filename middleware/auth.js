const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = (req, res, next) => {
    if(req.cookies.auth){
        jwt.verify(req.cookies.auth, 'SECRET_KEY', (error, decodedToken) => {
            if(error) {
                //console.log(error.message);
                res.redirect('/login');
            } else {
                //console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login')
    }
}

const checkUser = (req, res, next) => {
    if(req.cookies.auth){
        jwt.verify(req.cookies.auth, 'SECRET_KEY', async (error, decodedToken) => {
            if(error) {
                //console.log(error.message);
                res.locals.user = null;
                next();
            } else {
                //console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { auth, checkUser };