var express = require('express');
var auth = express.Router();
var User = require('../models/user.model');
var bcrypt = require('bcryptjs');
var {UnAuthorizedErrorHandler, BadRequestErrorHandler} = require('../helper/errorHandler');
var sendToken = require('../helper/sendToken');
var _ = require('lodash');


auth.post('/register', async (req,res) => {
    try{
       
        var userExists = await User.find({email: req.body.email}).exec();
        
        if(userExists != null && userExists != '') return BadRequestErrorHandler('Sorry User already exists', res);

        var user = new User({
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        });
        var userSaved = await user.save();
        
        return sendToken(res, userSaved.toJSON(), userSaved.firstname);
    } catch(error){
       
        return BadRequestErrorHandler('An error occured while saving the user', res);
    }
});

auth.post('/login', async (req,res) => {
    try{
        
        var user = await User.findOne({email: req.body.email});
        if(!user) return UnAuthorizedErrorHandler(res);

        if(! bcrypt.compareSync(req.body.password, user.password)) return UnAuthorizedErrorHandler(res);

        sendToken(res, user.toJSON(), user.firstname);
    }catch(error){
        
        return UnAuthorizedErrorHandler(res)
    }
});

auth.post('/checkEmail', async (req, res) => {

    try{
        var user = await User.find({email: req.body.email}).exec();
        
        if(user != null && user != ''){
            return res.send({emailTaken: true});
        } else {
            return res.send({emailTaken: false});
        }
    } catch(error){
        res.send({emailTaken: false});
    }
});

module.exports = auth;