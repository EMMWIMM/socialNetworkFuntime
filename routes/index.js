const express = require('express');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');
const util = require('util')
const router = express.Router();

//note: @em , not sure what these are for? or planned for ?
// const User = require('./User');


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
router.patch('/thoughts/:id', async(req, res) => {
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
    console.log('req'+req);
    //console.log('req: '+util.inspect(req, false, null, true ))
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
    console.log("calling /api/thoughts/"+req.params.thoughtId);
    try {
        const thought = await Thought.findOne({_id: req.params.thoughtId});
        console.log("found a thought");
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
//router.get('/users');
//router.get('/users/:userId/reactions');

module.exports = router;
//{
    //User, //NOTE: @em commented out because IDK what you want to happen with USERS from a route perspective

    //Thought, 
    //router
//}; // was getting TypeError: Router.use() requires a middleware function but got a Object ... if I tried using the brackets???
