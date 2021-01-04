const express = require("express");
const Blog = require("../models/blogSchema");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// creating using JSON format
const createBlog = (req, res) => {
  //verifying body
  let parameters = ["author", "title", "content"];
  let blogs = parameters.every((blog) => {
    return req.body[blog];
  });
  if (!blogs) {
    return res.status(400).json({
      status: "unsuccessful",
      message: "req body is invalid",
    });
  }

  let newBlog = new Blog();
  newBlog.author = req.body.author;
  newBlog.title = req.body.title;
  newBlog.content = req.body.content;

  newBlog.save((err, data) => {
    try {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          status: "Blog created",
          data: data,
        });
      }
    } catch {
      return err;
    }
  });
};
// creating using form-data and uploading image
const middleware = (req, res, next) => {
  var imageName;
  var uploadStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "images"));
    },
    filename: function (req, file, cb) {
      imageName = file.originalname;
      cb(null, imageName);
    },
  });

  var upload = multer({ storage: uploadStorage });

  var uploadFile = upload.single("image");

  uploadFile(req, res, function (err) {
    console.log(req.file);
    let newBlog = new Blog();
    console.log(req.file);
    newBlog.author = req.body.author;
    newBlog.title = req.body.title;
    newBlog.content = req.body.content;

    newBlog.img.data = req.file.path;
    newBlog.img.contentType = "images/jpeg";

    newBlog.save((err, data) => {
      try {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({
            status: "Blog created",
            data: data,
          });
        }
      } catch {
        return err;
      }
    });
  });
};

// get all the blogs
const getAllBlogs = function (req, res) {
  Blog.find((err, data) => {
    try {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          status: "unsuccessful",
          data,
        });
      }
    } catch {
      return err;
    }
  });
};

// get blog by ID
const getBlogbyId = (req, res) => {
  Blog.findOne({ id: req.params.id }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).json({
        status: "successful",
        data,
      });
    }
  });
};

// delete the blog by id
const deleteBlog = (req, res) => {
  Blog.remove({ id: req.params.id }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).json({
        status: "successful",
        message: "Data deleted",
        data,
      });
    }
  });
};

module.exports.createBlog = createBlog;
module.exports.getBlogbyId = getBlogbyId;
module.exports.deleteBlog = deleteBlog;
module.exports.getAllBlogs = getAllBlogs;
module.exports.middleware = middleware;
