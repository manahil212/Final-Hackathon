import express from "express";
import { submitProject } from "../controllers/projectController.js";

const router = express.Router();

router.post("/submit", submitProject);

export default router;