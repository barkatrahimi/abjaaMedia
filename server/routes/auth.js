import express from "express";
import { loign } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", loign);

export default router;