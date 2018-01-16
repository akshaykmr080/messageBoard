

var jwt = require('jsonwebtoken');
var sendToken = (res, user, username) => {
    let userId = user._id;
    var token = jwt.sign(user, '1234');
    return res.json({username, token, userId});
};

module.exports = sendToken;