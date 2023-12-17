const { Schema, model } = require('mongoose');

// ------------ REACTION SCHEMA ------------
// used for user responses to thoughts - not a model
reactionSchema = new Schema ({
    // reactionId: {
    //     type: Schema.Types.ObjectId,
    //     default: new Schema.Types.ObjectId,
    // },
    reactionBody: {
        type: String,
        required: true,
        max_length: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
            if (date) return date.toString();
        },
    },
},
{
    toJSON: {
      getters: true,
    },
    id: false,
});

// ------------ THOUGHT SCHEMA ------------
// user comments - other users can reply in the form of 'reactions'
thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
            if (date) return date.toString();
        },
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
},
{
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  });

// virtual for thoughts, returns reaction (comment) length
thoughtSchema
.virtual('reactionCount')
.get(function (){
    return `${this.reactions.length}`
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;