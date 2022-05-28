const res = require("express/lib/response");
const { Thought, User, Types } = require("../models");

const thoughtController = {
   // Get all thoughts
   getAllThoughts(req, res) {
      Thought.find({})
         .select("-__v")
         .sort({ _id: -1 })
         .then((dbThoughtData) => res.json(dbThoughtData))
         .catch((err) => {
            console.log(err);
            res.status(400).json(err);
         });
   },

   // Get a single thought by its id
   getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.thoughtId })
         .select("-__v")
         .then((dbThoughtData) => {
            if (!dbThoughtData) {
               res.status(404).json({
                  message: "This id does not match any thoughts!",
               });
               return;
            }
            res.json(dbThoughtData);
         })
         .catch((err) => {
            console.log(err);
            res.status(500).json(err);
         });
   },

   // post to create new thought
   createThought({ params, body }, res) {
      Thought.create(body)
         .then(
            { _id: params.userId },
            { $push: { thoughts: _id } },
            { new: true }
         )
         .then((dbUserData) => {
            if (!dbUserData) {
               res.status(400).json({
                  message: "Please enter a valid user ID!",
               });
               return;
            }
            res.json(dbUserData);
         })
         .catch((err) => res.json(err));
   },

   // post to create reaction stored in single thought's reactions array field
   addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
         { _id: params.thoughtId },
         { $push: { reactions: body } },
         { new: true, runValidators: true }
      )
         .then((dbThoughtData) => {
            if (!dbThoughtData) {
               res.status(404).json({
                  message: "No thought found with this ID!",
               });
               return;
            }
            res.json(dbThoughtData);
         })
         .catch((err) => res.json(err));
   },

   // Delete a thought through its _id value
   removeThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.thoughtId })
         .then((deletedThought) => {
            if (!deletedThought) {
               return res
                  .status(404)
                  .json({ message: "There is no thought found with this ID!" });
            }
            // remove users associatied thoughts when deleted
            return User.findOneAndUpdate(
               { _id: params.username },
               { $pull: { thoughts: params.thoughtId } },
               { new: true }
            );
         })
         .then((dbUserData) => {
            res.json(dbUserData);
         })
         .catch((err) => res.json(err));
   },

   // remove a reaction, pull and remove reaction by reactionId value
   removeReaction({ params }, res) {
      Thought.findOneAndUpdate(
         { _id: params.thoughtId },
         { $pull: { reactions: { reactionId: params.reactionId } } },
         { new: true }
      )
         .then((dbThoughtData) => res.json(dbThoughtData))
         .catch((err) => res.json(err));
   },
};

module.exports = thoughtController;
