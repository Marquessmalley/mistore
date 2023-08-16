const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://marquessmalley:GvoNZegve8HnCwWy@cluster0.4ggpj9a.mongodb.net/mistrain-db"
      )
      .then(() => console.log("Connected to database successfully"));
  } catch (err) {
    console.error(err);
  }
};

module.exports = dbConnect;
