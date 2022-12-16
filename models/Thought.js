const { Schema, model, Types } = require('mongoose');
conts reactionsSchema = require('./Reaction')

const thoughtsSchema = new Schema(
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
    reactions:[reactionsSchema],

  },{toJSON:{
    getters:true,
  },
id:false,}
)

module.exports = thoughtsSchema;
