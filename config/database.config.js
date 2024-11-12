const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_NAME,
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB " + err.message);
    });
};

module.exports = connectDB;
