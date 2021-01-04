const express = require("express");
const Blog = require("../models/blogSchema");

const {
  middleware,
  createBlog,
  getBlogbyId,
  deleteBlog,
  getAllBlogs,
} = require("../controllers/blogController");

const router = express.Router();
router.route("/getAllBlogs").get(getAllBlogs);
router.route("/newblog").post(createBlog);
router.route("/upload").post(middleware);
router.route("/:id").get(getBlogbyId);
router.route("/:id").patch(deleteBlog);
module.exports = router;
