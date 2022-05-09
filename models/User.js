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
         match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
      },

      userCreated: {
         type: Date,
         default: Date.now,
      },
   },
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
