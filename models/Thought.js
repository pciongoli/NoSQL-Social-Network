const { Shema, model, Types, Schema } = require("mongoose");

const ReactionSchema = new Schema({});

const ThoughtSchema = new Schema({});

ThoughtSchema.virtual("reactionCount").get(function () {
   return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
