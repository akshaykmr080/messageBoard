var UnAuthorizedErrorHandler = (res) => {
    return res.status(401).json({success: false, message: 'email or password incorrect'});
};

var BadRequestErrorHandler = (res) => {
    return res.status(501).json({success: false, message: 'Email Id taken'});
};

module.exports = {UnAuthorizedErrorHandler, BadRequestErrorHandler};