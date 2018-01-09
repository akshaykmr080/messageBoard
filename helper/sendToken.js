

var jwt = require('jsonwebtoken');
var sendToken = (res, id, username) => {
    var token = jwt.sign(id, '1234');
    res.json({username, token});
};

module.exports = sendToken;