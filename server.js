const express = require("express");
const app = express();
const dotenv = require("dotenv");
// Load environment variables from .env file
dotenv.config({
  path: ".env",
});
// Define middleware for parsing JSON request bodies
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// Connect to MongoDB
const databaseConnection = require("./config/database.config");
const port = process.env.PORT;
const articleRoute = require("./routers/article.route");
app.use("/api/articles", articleRoute);
const commentRoute = require("./routers/comment.route");
app.use("/api/comments", commentRoute);
databaseConnection();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
