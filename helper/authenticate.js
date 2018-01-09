var jwt = require('jsonwebtoken');
var authenticate = (req, res, next) => {
    console.log('Reaching here')
    if(!req.header('x-auth'))
        return res.status(401).send({message:'UnAuthorized request. Token header not present'});

    var token = req.header('x-auth').split(' ')[1];
    var payload = jwt.decode(token, '1234');

    if(!payload)
        return res.status(401).send({message:'UnAuthorized request. Token header invalid'});

    req.userId = payload;
    next();
}

module.exports = authenticate;