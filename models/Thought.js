// const { Schema, model, Types } = require('mongoose');
const reactionsSchema = require('./Reaction.js')
const mongoose = require('mongoose')

const thoughtsSchema = new mongoose.Schema(
  {
    thoughtText:{
      type:String,
      required:true,
      maxlength:280,
      minlength: 1,
    },
    createAt:{
      type: Date,
      default: Date.now,
  
    },
    username:{
      type:String,
      required: true,
    },
    reactions:[
      new mongoose.Schema(
      {
        reactionBody:{
          type: String,
          required:true,
          maxlength:280,
          minlength: 1,
        },
        username:{
          type: String,
          required: true,
    
        },
        createAt:{
          type: Date,
          default: Date.now,
    
        },
    
      },
      {
          toJSON:{
            getters:true,
          },
          id:false,
      }
    )],
    // reactions:[
      // {type: mongoose.Schema.Types.ObjectId,ref:'Reaction'}
    // ]

  },
  // {
  //   toJSON:{
  //     getters:true,
  //   },
  //   id:false,
  // }
)
thoughtsSchema.virtual('reactionCount').get(function() {
  this.reactions.length;
});
module.exports = mongoose.model('Thought',thoughtsSchema);
