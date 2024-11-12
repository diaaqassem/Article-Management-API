const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 5000,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      enum: ["published", "draft", "deleted"],
      default: "draft",
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

articleSchema.set("toObject", { virtuals: true });
articleSchema.set("toJSON", { virtuals: true });

articleSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "articleId",
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
