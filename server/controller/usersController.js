const User = require("../models/user");

// @desc Get all users
// @route GET /users
// @access private
module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found!" });
    }

    res.status(200).json({ message: "Users found successfully.", users });
  } catch (err) {
    console.error(err);
  }
};

// @desc Get user
// @route GET /users/:id
// @access private
module.exports.getUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    res.status(200).json({ message: "User found successfully.", user });
  } catch (err) {
    // Invalid user id
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Invalid user ID" });
    }
  }
};

// @desc Create a user
// @route POST /users
// @access private
module.exports.createUser = async (req, res, next) => {
  try {
    const image = req.file ? req.file.path : undefined;
    const { firstname, lastname, email, password, role } = req.body;
    let newUser;
    if (image) {
      newUser = await User.create({
        firstname,
        lastname,
        email,
        password,
        role,
        image,
      });
    } else {
      newUser = await User.create({
        firstname,
        lastname,
        email,
        password,
        role,
      });
    }

    res.status(201).json({
      message: "User created successfully",
      newUser,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error. Make sure fields filled out correctly.",
        err,
      });
    }
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Email already exists.", error: true });
    }
  }
};

// @desc Update a user
// @route PATCH /users/:id
// @access private
module.exports.updateUser = async (req, res, next) => {
  try {
    const image = req.file ? req.file.path : undefined;

    const { id, firstname, lastname, email, role } = req.body;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!firstname || !lastname || !email || !role) {
      return res
        .status(400)
        .json({ message: "Make sure all fields are filled" });
    }

    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.role = role;

    if (image !== undefined) {
      user.image = image;
    }

    const updatedUser = await user.save();

    res.status(201).json({ updatedUser });
  } catch (err) {
    // Validation error handler
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error. Make sure fields are correct.",
        error: true,
      });
    }

    // Duplicate key error
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Email already exists.", error: true });
    }
    // Invalid user id
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Invalid user ID" });
    }
  }
};

// @desc Delete users
// @route DELETE /users/:id
// @access private
module.exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Invalid user ID" });
    }
  }
};
