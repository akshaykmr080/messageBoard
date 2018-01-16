var UnAuthorizedErrorHandler = (res) => {
    return res.status(401).json({success: false, message: 'email or password incorrect'});
};

var BadRequestErrorHandler = (messageData, res) => {
    return res.status(501).json({success: false, message: messageData});
};

module.exports = {UnAuthorizedErrorHandler, BadRequestErrorHandler};