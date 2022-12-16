const { Schema, model, Types } = require('mongoose');

const reactionsSchema = new Schema(
  {
    reactionID:{
        type:schema.types.objectID,
        default:()=> new Types.objectID(),
    },
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
  {toJSON:{
    getters:true,
  },
id:false,}
);

module.exports = reactionsSchema;
