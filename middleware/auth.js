const jwt = require('jsonwebtoken');
const User = require('../models/user');

//Vérifier si un token existe
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

//Verifier qui est l'utilisateur actuel
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

//Si l'utilisateur est connecté alors les login et register ne sont pas accessible
const userRedirect = (req, res, next) => {
    if(req.cookies.auth){
        jwt.verify(req.cookies.auth, 'SECRET_KEY', async (error, decodedToken) => {
            if(error) {
                next();
            } else {
                //console.log(decodedToken)
                res.redirect('/');
            }
        })
    } else
        next();
}


module.exports = { auth, checkUser, userRedirect };