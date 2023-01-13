
const mongoose = require('mongoose');
const thoughtsSchema = require('./Thought')

const userSchema = new mongoose.Schema(

  {

    username:{
      type: String,
      required: true,
      trimmed: true,
      unique: true,
    },
    email:{
      type: String,
      required:true,
      unique: true,
      validate: { // Must match a valid email address (look into Mongoose's matching validation)
        validator: function (email){
            return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\    [\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email);
            }
        }
    },
    thoughts:[
      {type: mongoose.Schema.Types.ObjectId,ref:'Thought'}
    ],


    friends:[
      {
        type: mongoose.Schema.Types.ObjectID,
        ref:'User'
      }
    ]

    },
    {
      toJSON:{
        getters:true,
      },
      //id:false,
  }
)
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

module.exports = mongoose.model('User',userSchema);
