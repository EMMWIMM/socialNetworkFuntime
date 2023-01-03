const express = require('express');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');
const util = require('util')
const router = express.Router();
const User = require('../models/User')




router.get('/thoughts', async (req, res) => {
    const thoughts = await Thought.find();
    res.send(thoughts);
});

router.get('/thoughts/:id', async (req, res) => {
    try {
        const post = await Thought.findOne({_id: req.params.id});
        res.send(post);
    } catch (error) {
        res.status(404);
        res.send({error: 'Thought with _id:'+req.params.id+' does not exist'});
    }
});

//update
router.put('/thoughts/:id', async(req, res) => {
    try {
        const thought = await Thought.findOne({_id: req.params.id});
        if(req.body.username){
            thought.username = req.body.username;
        }
        if(req.body.thoughtText){
            thought.thoughtText = req.body.thoughtText;
        }

        await thought.save();
        res.send(thought);
    } catch (error) {
        res.status(404);
        res.send({error: 'Thought with _id:'+req.params.id+' does not exist'});
    }
});

router.post('/thoughts', async (req, res) => {
    const thought = new Thought({
        username: req.body.username,
        thoughtText: req.body.thoughtText
    });
    
    
    await thought.save();
    res.send(thought);
});

router.delete('/thoughts/:id', async (req, res) => {
    try {
        await Thought.deleteOne({_id: req.params.id});
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({error: 'Thought with _id:'+req.params.id+' does not exist' });
    }
});

//routes for Reactions
router.post('/thoughts/:thoughtId/reactions', async (req, res) =>{
  
    try {
        const thought = await Thought.findOne({_id: req.params.thoughtId});
        const reaction = new Reaction({
            body: req.body.reactionBody,
            username: req.body.username
        })

        thought.reactions.push(reaction);
        await thought.save();
        res.send(reaction)
    } catch {
        res.status(404);
        res.send({error: 'Thought with _id:'+req.params.thoughtId+' does not exist' });
    }

});
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) =>{
    try {
        const thought = await Thought.findOne({_id: req.params.thoughtId});
        let tempReactions = thought.reactions.filter(function(value, index, array){
            return value != req.params.reactionId;
        });
        thought.reactions = tempReactions;
        await thought.save();
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({error: 'Reaction with _id:'+req.params.reactionId+' does not exist' });
    }
});

//routes for Users
router.get('/users', async (req, res) =>{
    const users = await User.find();
    res.send(users);
});
router.get('/users/:userId', async (req, res) =>{
    try {
        const user = await User.findOne({_id: req.params.userId});
        res.send(user);
    } catch (error) {
        res.status(404);
        res.send({error: 'User with _id:'+req.params.userId+' does not exist'});
    }
});
router.post('/users', async (req, res) =>{
    const user = new User({
        username: req.body.username,
        email: req.body.email
    });
    
    await user.save();
    res.send(user);
});

router.put('/users/:userId', async (req, res) =>{
    try {
        
        const user = await User.findOne({_id: req.params.userId});
        
        if(req.body.username){
            user.username = req.body.username;
           
        }
        if(req.body.email){
            user.email = req.body.email;
                   }        
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(404);
        res.send({error: 'User with _id:'+req.params.userId+' does not exist'});
    }
});
router.delete('/users/:userId', async (req, res) =>{
    //delete user
    try {
        await User.deleteOne({_id: req.params.userId});
        res.status(204);
        res.send();
    } catch {
        res.status(404);
        res.send({error: 'User with _id:'+req.params.userId+' does not exist' });
    }
   
});
router.post('/users/:userId/friends/:friendId', async (req, res) => {
    const user = await User.findOne({_id: req.params.userId});
    const friend = await User.findOne({_id: req.params.friendId});
    user.friends.push(friend);
    await user.save();
    res.send(user);
});
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.userId});
        let tempFriends = user.friends.filter(function(value, index, array){
            return value != req.params.friendId;
        });
        user.friends = tempFriends;
        await user.save();
        res.status(204).send({message: 'Friend Deleted' });
    } catch {
        res.status(404).send({error: 'User with _id:'+req.params.userId+' does not exist' });
    }
});


module.exports = router;

