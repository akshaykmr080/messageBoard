var express = require('express');
var api = express.Router();

var users = require('../store/users');
var messages = require('../store/messages');
var authenticate = require('../helper/authenticate');

var sendToken = require('../helper/sendToken');

api.get('/messages/:name', authenticate, (req,res) => {
    console.log("Reached")
    var user = req.params.name;
    var userId = req.userId;
    console.log('Here '+user);
    var messageData = messages.filter(message => message.owner === user);

    res.json({messageData, userId});
}); 

api.get('/messages', authenticate, (req,res) => {
    var userId = req.userId;
    res.json({messages, userId});
});


api.get('/users/me', authenticate, (req,res) => {
    var user = users[req.userId];
    var resData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userId: user.id
    }
    res.send(resData);
});

api.post('/users/me', authenticate, (req,res) => {
    console.log(req.body)
    var user = users[req.userId];
    user.firstName = req.body.firstname;
    user.lastName = req.body.lastname;

    res.json(user);
})

api.post('/messages', authenticate, (req,res) => {
    console.log('got here');
    req.body.userId = req.userId; 
    messages.push(req.body);
    res.status(200).send(req.body);
});

api.delete('/messages/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var message = messages[id];
    messages.splice(id, 1);
    res.json(message);
})

module.exports = api;
