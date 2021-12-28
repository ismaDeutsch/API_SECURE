const jwt = require('jsonwebtoken');

module.exports.handlErrors = (err) => {
    let errors = { email: '', pwd: '' };

    //Duplication erreur
    if(err.code === 11000){
        errors.email = 'Cette email éxiste déja';
        return errors;
    }

    // Champs vide
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }

    //Login erreur
    //Utilisateur inéxistant
    if(err.message === 'user error'){
        errors.email = 'L\'adresse e-mail ou l\'identifiant et/ou le mot de passe saisis sont incorrects.';
    }
    
    //Mot de passe incorrecte
    if(err.message === 'pwd error'){
        errors.pwd = 'L\'adresse e-mail ou l\'identifiant et/ou le mot de passe saisis sont incorrects.';
    } 

    return errors;
}

module.exports.createToken = (id) => {
    return jwt.sign({ id }, 'SECRET_KEY', {
        expiresIn: '24h'
    })
}


