const Article = require("../models/article.schema");

module.exports = {
  getAllArticles: async (req, res) => {
    try {
      const countDocuments = await Article.countDocuments();
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 30;
      const skip = (page - 1) * limit;
      const endIndex = page * limit;
      const query = req.query.category || {};
      const pagination = {};
      pagination.currentPage = page;
      pagination.limit = limit;
      pagination.numberOfPages = Math.ceil(countDocuments / limit);
      if (endIndex < countDocuments) {
        pagination.next = page + 1;
      }
      if (skip > 0) {
        pagination.prev = page - 1;
      }
      const articles = await Article.find(query).skip(skip).limit(limit);
      res
        .status(200)
        .json({ results: articles.length, pagination, data: articles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  getArticleById: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id).populate(
        "comments"
      );
      if (!article)
        return res.status(404).json({ message: "Article not found" });
      res.json(article);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  createArticle: async (req, res) => {
    try {
      const article = new Article(req.body);
      await article.save();
      res.status(201).json(article);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Invalid data" });
    }
  },

  updateArticle: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (!article)
        return res.status(404).json({ message: "Article not found" });
      if (article.status === "published") {
        return res
          .status(400)
          .json({ message: "Cannot update published article" });
      }
      const articleUpdated = await Article.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(articleUpdated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  deleteArticle: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (!article)
        return res.status(404).json({ message: "Article not found" });
      await article.remove();
      // Delete all comments associated with the article
      await article.comments.forEach(async (comment) => {
        await Comment.findByIdAndDelete(comment._id);
      });
      res.json({ message: "Article deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  likeArticle: async (req, res, next) => {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    if (article.status === "draft") {
      return res.status(400).json({ message: "Cannot like draft article" });
    }
    await Article.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(article);
  },
};
