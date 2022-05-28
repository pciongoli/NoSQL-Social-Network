const res = require("express/lib/response");
const { Thought, User, Types } = require("../models");

const ThoughtController = {
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
   addThought({ params, body }, res) {
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

   // Update a thought through its _id value

   // Delete a thought through its _id value

   // post to create reaction stored in single thought's reactions array field

   // delete to pull and remove reaction by reactionId value
};
