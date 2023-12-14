const { Schema, model } = require('mongoose');

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

});

/* User

username

String
Unique
Required
Trimmed
email

String
Required
Unique
Must match a valid email address (look into Mongoose's matching validation)
thoughts

Array of _id values referencing the Thought model
friends

Array of _id values referencing the User model (self-reference) */