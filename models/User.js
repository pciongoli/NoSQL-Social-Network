const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
   {
      username: {
         type: String,
         trim: true,
         unique: true,
         required: "First Name is Required",
      },

      email: {
         type: String,
         unique: true,
         // need to add validators
         match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
      },

      userCreated: {
         type: Date,
         default: Date.now,
      },
   },
   // need to add thoughts array of _id values references the Thought model

   // need to add friends array of _id values references the User model (self referenced)
   {
      toJSON: {
         virtuals: true,
      },
      id: false,
   }
);

UserSchema.virtual("username").get(function () {
   return this.username;
});

const User = model("User", UserSchema);

module.exports = User;
