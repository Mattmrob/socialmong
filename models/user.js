const { Schema, model } = require('mongoose');

// ------------ USER SCHEMA ------------
// contains user data as well as a user's comments created (reference thoughts)
// and the user's friends (references itself)
userSchema = new Schema({
    username: {
        type: String, 
        unique: true,
        required: true,
        $trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /.+\@.+\..+/,
        // regex solution from https://masteringjs.io/tutorials/mongoose/mongoose-validate-unique-email
        // 'look for anything followed by a @ followed by anything followed by a . followed by anthing'
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
          },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
          },
    ],
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// virtual to return length of user's friend's list on query
userSchema
.virtual('friendCount')
.get(function (){
    return `${this.friends.length}`
});

const User = model('User', userSchema);

module.exports = User;
