var express = require('express');
var api = express.Router();

var authenticate = require('../helper/authenticate');
var {BadRequestErrorHandler} = require('../helper/errorHandler')
var sendToken = require('../helper/sendToken');
var User = require('../models/user.model');
var  _ = require('lodash');


api.get('/me', authenticate, async (req,res) => {

    try{
       
        var user = await User.findById(req.user._id).exec();

        delete user['password'];
        
        res.json({
            message: 'Success',
            obj: user
        })
    } catch(error){
        
        return BadRequestErrorHandler('An error occured while retrieving the user details', res);
    }
});

api.post('/me', authenticate, async (req,res) => {

    try{
        var updatedUser = User.update({ _id:  req.user._id}, { 
                                    $set: { 
                                        firstname: req.body.firstname,
                                        lastname: req.body.lastname
                                    }
                                    }).exec();
        res.json({
            messages:'Success',
            obj: updatedUser
        })
    } catch(error){
         return BadRequestErrorHandler('An error occured while updating the user details', res);
    }
})

api.get('/name/:id', authenticate, async (req, res) => {
    var userId = req.params.id;
    try {
        var user  = await User.findById(userId).exec();
        res.json({
            messages:'Success',
            obj: user.firstname
        })
    } catch(error){
        return BadRequestErrorHandler('An error occured while fetching user with ID :' + userId, res);
    }
})


module.exports = api
