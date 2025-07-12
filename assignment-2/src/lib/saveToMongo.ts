import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI!;
const blogSchema = new mongoose.Schema({
  url: String,
  content: String,
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export async function saveToMongo(url: string, content: string) {
  await mongoose.connect(mongoURI);
  const blog = new Blog({ url, content });
  await blog.save();
}
