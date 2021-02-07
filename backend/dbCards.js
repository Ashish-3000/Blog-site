import mongoose from "mongoose";

//db for blogs
const blogSchema = mongoose.Schema({
  title: String,
  content: String,
});

export default mongoose.model("blog", blogSchema);
