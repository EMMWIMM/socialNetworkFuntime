//const { Schema, model, Types } = require('mongoose');
const mongoose = require('mongoose');


const reactionsSchema = new mongoose.Schema(
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
);

module.exports = mongoose.model('Reaction',reactionsSchema);
