const express = require('express');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');
const util = require('util')
const router = express.Router();
const User = require('../models/User')

router.get('/thoughts', async (req, res) => {
    console.log('get all thoughts');
    const thoughts = await Thought.find();
    res.send(thoughts);
});

router.get('/thoughts/:id', async (req, res) => {
    console.log('get thought by id'+req.params.id);
    try {
        console.log('get thought by id');
        console.log('req: '+req);
        const thought = await Thought.findOne({_id: req.params.id});
        res.send(thought);
    } catch (error) {
        res.status(404);
        res.send({error: 'Thought with _id:'+req.params.id+' does not exist'});
    }
});

//update
router.put('/thoughts/:id', async(req, res) => {
    console.log('get thought by id'+req.params.id);
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

    //also save the thought in the users's thoughts array?
    const user = await User.findOne({username: req.body.username});
    console.log(user);
    console.log(user.thoughts);
    user.thoughts.push(thought);
    res.send(thought);
});

router.delete('/thoughts/:id', async (req, res) => {
    console.log('delete thought by id'+req.params.id);
    try {
        console.log("req: "+req);
        console.log("req.params.id: "+req.params.id);
        await Thought.deleteOne({_id: req.params.id});
        console.log('1');
        res.status(204);
        console.log('2');
        res.send();
    } catch {
        res.status(404);
        res.send({error: 'Thought with _id:'+req.params.id+' does not exist' });
    }
});

//routes for Reactions
router.post('/thoughts/:thoughtId/reactions', async (req, res) =>{
<<<<<<< HEAD
    console.log("calling /api/thoughts/"+req.params.thoughtId);
    console.log('reaction body is '+req.body.reactionBody);
=======
  
>>>>>>> 5313577ec1ee549c25db9456242c1881d10f7031
    try {
        const thought = await Thought.findOne({_id: req.params.thoughtId});
        const reaction = new Reaction({
            reactionBody: req.body.reactionBody,
            username: req.body.username
        })
        console.log('reaction to add: '+reaction);
        thought.reactions.push(reaction);
        console.log(reaction+' reaction added');
        await thought.save();
        console.log('thought saved');
        res.send(reaction)
    } catch(error) {
        console.log('error: '+error);
        res.status(404);
        res.send({error: 'Thought with _id:'+req.params.thoughtId+' does not exist' });
    }

});
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) =>{
    try {
        const thought = await Thought.findOne({_id: req.params.thoughtId});
        console.log('delete reaction for thought:');
        let tempReactions = thought.reactions.filter(function(value, index, array){
            console.log('value: '+value);
            console.log('index: '+index);
            //console.log('array: '+array);
            let returnVal= ( value._id != req.params.reactionId);
            console.log('returnVal:'+returnVal);
            return returnVal;
        });
        console.log('tempReactions: '+tempReactions);
        thought.reactions = tempReactions;
        console.log('thought.reactions: '+thought.reactions);
        await thought.save();
        console.log('saved');
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
router.get('/userByName/:username', async (req, res) =>{
    try {
        const user = await User.findOne({username: req.params.username});
        res.send(user);
    } catch (error) {
        res.status(404);
        res.send({error: 'User with username:'+req.params.username+' does not exist'});
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
        console.log('There was an error '+error+' saving user:'+user);
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

