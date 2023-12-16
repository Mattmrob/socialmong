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
            { $addToSet: { thoughts: req.body._id } },
            { runValidators: true, new: true }
            );

            if (!user) {
            return res.status(404).json({ message: 'No application with this id!' });
            }

        res.json(thought);
        } catch (err) {
        res.status(500).json(err);
        }
    },

    // Get a single user
    async getSingleUser(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends');

        if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
    },

    // update single user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
            );

            if (!user) {
            return res.status(404).json({ message: 'No application with this id!' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
        },

    // Delete a user and associated apps
    async deleteUser(req, res) {
        try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        await Application.deleteMany({ _id: { $in: user.applications } });
        res.json({ message: 'User and associated apps deleted!' })
        } catch (err) {
        res.status(500).json(err);
        }
    },

    // --------- FRIENDS LIST ---------

    // Add a friend to a user
    async addFriend(req, res) {

        try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
            .status(404)
            .json({ message: 'No user found with that ID' });
        }

        res.json(user);
        } catch (err) {
        res.status(500).json(err);
        }
    },

    // Remove a friend to a user
    async removeFriend(req, res) {
        try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
            .status(404)
            .json({ message: 'No student found with that ID' });
        }

        res.json(user);
        } catch (err) {
        res.status(500).json(err);
        }
    },
};

  

