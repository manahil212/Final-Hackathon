// MONGODB CONNECTION YAHA CALL HOGA OR ROUTES HONGAI

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import ticketRoutes from "./routes/ticketRoutes.js"

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});