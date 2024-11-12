const Comment = require("../models/comment.schema");

module.exports = {
  createComment: async (req, res) => {
    try {
      const comment = new Comment(req.body);
      await comment.save();
      res
        .status(201)
        .json({ message: "Comment created successfully", comment });
    } catch (error) {
      res.status(500).json({ message: "Error creating comment", error });
    }
  },

  updateComment: async (req, res) => {
    try {
      const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.json({ message: "Comment updated successfully", comment });
    } catch (error) {
      res.status(500).json({ message: "Error updating comment", error });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting comment", error });
    }
  },
};
