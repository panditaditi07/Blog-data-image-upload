const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const blogRouter = require("./routes/blogRoutes");
dotenv.config({ path: "./config.env" });
const multer = require("multer");
const app = express();
app.use(express.json());
// const upload = multer({
//   dest: "upload",
// });

// app.post("/blogs/upload", upload.single("upload"), async (req, res) => {
//   res.send();
// });
// app.use(blogRouter);
app.use("/blogs", blogRouter);
mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, connection) => {
    if (err) {
      console.log(err);
      return console.log("error in connecting database");
    }

    console.log("Successfully connected to database");

    app.listen(3000, console.log("server starting at 3000"));
  }
);
