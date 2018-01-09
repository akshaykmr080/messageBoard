var express = require('express');
var auth = express.Router();

var users = require('../store/users');
var {UnAuthorizedErrorHandler, BadRequestErrorHandler} = require('../helper/errorHandler');
var sendToken = require('../helper/sendToken');

auth.post('/register', (req,res) => {
    var userExists = users.find(user => user.email === req.body.email);
    if(userExists) return BadRequestErrorHandler(res);
    var index = users.push(req.body) - 1;
    var user = users[index];
    user.id = index;
    var username = user.firstName;
    sendToken(res, user.id, username);
});

auth.post('/login', (req,res) => {
    var user = users.find(user => user.email === req.body.email);

    if(!user) return UnAuthorizedErrorHandler(res)

    if(user.password !== req.body.password) return UnAuthorizedErrorHandler(res)

    var index = users.indexOf(user);
    var username = user.firstName;
    sendToken(res, index, username);
    
});

auth.post('/checkEmail', (req, res) => {
    console.log("HAHAHAH")
    console.log(req)
    var user = users.find(user => user.email === req.body.email);
    if(user){
        console.log('user found')
        return res.send({emailTaken: true});
    }
    else{
        console.log('email not found')
       return res.send({emailTaken: false});
    }
});

module.exports = auth;