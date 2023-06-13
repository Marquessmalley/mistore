const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose
      .connect(process.env.DATABASE)
      .then(() => console.log("Connected to database successfully"));
  } catch (err) {
    console.error(err);
  }
};

module.exports = dbConnect;
