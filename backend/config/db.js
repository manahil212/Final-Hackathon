// YAHA MONGODB CONNECTION BANAIGA
import mongoose from "mongoose";
import dns from "node:dns";
import dotenv from "dotenv"
import chalk from "chalk"

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config()


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(chalk.green.bold("MongoDB Connected "));
  } catch (error) {
    console.log("Database Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;