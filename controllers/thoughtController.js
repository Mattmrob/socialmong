const { User, Thought } = require('../models');

module.exports = {
    
    // --------- THOUGHTS ---------

    // Get all thoughts
    async getThoughts(req, res) {
        try {
        const thought = await Thought.find();
        res.json(thought);
        } catch (err) {
        res.status(500).json(err);
        }
    },

    // create a new thought and put into creating user's thoughts array
    async createThought(req, res) {
        try {
        const thought = await Thought.create(req.body);

        // push set id to user array
        const user = await User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: { thoughts: thought._id } },
            { runValidators: true, new: true }
            );

            if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
            }

        res.json(thought);
        } catch (err) {
        res.status(500).json(err);
        }
    },

    // Get a single thought by id
    async getSingleThought(req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')

        if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
    },

    // update single thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
            );

            if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
        },

    // Delete a thought by id
    async deleteThought(req, res) {
        try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json({ message: 'Thought deleted!' })
        } catch (err) {
        res.status(500).json(err);
        }
    },

    // --------- REACTIONS ---------

    // Add a reaction to a thought by id
    async addReaction(req, res) {

        try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: { username: req.body.username, reactionBody: req.body.reactionBody } } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res
            .status(404)
            .json({ message: 'No thought found with that ID' });
        }

        res.json(thought);
        } catch (err) {
        res.status(500).json(err);
        }
    },

    // Remove a reaction by its reaction id
    async removeReaction(req, res) {
        try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res
            .status(404)
            .json({ message: 'No thought found with that ID' });
        }

        res.json(thought);
        } catch (err) {
        res.status(500).json(err);
        }
    },
};

  

