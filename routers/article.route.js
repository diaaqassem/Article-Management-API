const express = require("express");
const router = express.Router();

// Import controllers
const {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  likeArticle,
} = require("../controllers/article.controller");

// Routes
router.get("/", getAllArticles);
router.get("/:id", getArticleById);
router.post("/", createArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

// Like article route
router.put("/:id/like", likeArticle);

module.exports = router;
