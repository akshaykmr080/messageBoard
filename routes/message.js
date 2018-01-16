var express = require('express');
var api = express.Router();


var authenticate = require('../helper/authenticate');
var {BadRequestErrorHandler} = require('../helper/errorHandler')
var sendToken = require('../helper/sendToken');

var Message = require('../models/message.model');
var User = require('../models/user.model');


api.get('/get', authenticate, async (req,res) => {
    
    try{
        var messages = await Message.find({}).populate('user').exec();
        res.json({
            message: 'Success',
            obj: messages
        });
    } catch(error){
        return BadRequestErrorHandler('An error occured while retrieving the messages', res);
    }
        
});


api.get('/:id', authenticate, async (req,res) => {
    
    var userId = req.params.id;
    try{
        
        var messagesFromMe = await Message.find({user :{ _id: userId}}).populate('user').exec();
        
        res.json({
            message: 'Success',
            obj: messagesFromMe
        });
    } catch(error){
        
        return BadRequestErrorHandler('An error occured while retrieving the messages from this user', res);
    }
    
}); 






api.post('/add', authenticate, async (req,res) => {
    
    try{
        
        var userData = await User.findById(req.user._id).exec();
        if(!userData) return BadRequestErrorHandler('User ID invalid', res);
       
        var messages = new Message({
            content: req.body.message,
            user: userData
        });
        var savedMessage = await messages.save();
        
        res.status(200).json({
            message: 'Message created',
            obj: savedMessage
        });
    } catch(error){
        
        return BadRequestErrorHandler('An error occured while saving the message', res);
    }
    
});

api.delete('/:id', authenticate, async (req, res) => {
    var messageId = req.params.id;

    try{
        var deletedMessage = await Message.findByIdAndRemove(messageId).exec();
        res.status(200).json({
            message: 'Message deleted',
            obj: deletedMessage
        });

    } catch(error){
        
        return BadRequestErrorHandler('An error occured while deleting the message', res);
    }
    
})

module.exports = api;
