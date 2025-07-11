import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

let isConnected = false;

// 1. Connect to MongoDB
async function connectToDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "blogDB",
    });
    isConnected = true;
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
}

// 2. Define the Schema
const BlogSchema = new mongoose.Schema({
  url: String,
  fullText: String,
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

// 3. Save Function
export async function saveToMongo(url: string, fullText: string) {
  await connectToDB();

  try {
    await Blog.create({ url, fullText });
  } catch (error) {
    console.error("Error saving to MongoDB:", error);
    throw new Error("MongoDB insertion failed");
  }
}
