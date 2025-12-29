import express from "express"
import { getQuiz } from "../controllers/Quiz.controller.js"
import { CreateQuiz } from "../controllers/Quiz.controller.js";
import { authmiddleware } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";

const router = express.Router();

router.get("/getquiz" , getQuiz);
router.post("/createquiz" , authmiddleware, isAdmin, CreateQuiz);

export default router;