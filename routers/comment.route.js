const express = require("express");
const router = express.Router();

const {
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");

// Routes
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;