// const { Schema, model, Types } = require('mongoose');
const reactionsSchema = require('./Reaction')
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
    //reactions:[reactionsSchema],
    reactions:[
      {type: mongoose.Schema.Types.ObjectId,ref:'Reaction'}
    ]

  },
  {
    toJSON:{
      getters:true,
    },
    id:false,
  }
)

module.exports = mongoose.model('Thought',thoughtsSchema);
