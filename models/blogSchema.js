const uniqid = require("uniqid");
const mongoose = require("mongoose");

//blog schema
const blogSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: "blog" + uniqid(),
    },
    author: {
      type: String,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },

    img: {
      data: Buffer,
      contentType: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;


