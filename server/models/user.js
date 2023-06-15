const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required."],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minLength: 6,
      trim: true,
    },
    roles: {
      type: [String],
      default: ["Employee"],
    },
  },
  { timestamps: true }
);

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  try {
    if (!this.password) return next();

    //generating salt to use for hashing
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    console.error(err);
  }
});

// Method attached to user model that make sure password is correct
userSchema.methods.correctPassword = async function (
  candidtePassword,
  userPassword
) {
  return await bcrypt.compare(candidtePassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
