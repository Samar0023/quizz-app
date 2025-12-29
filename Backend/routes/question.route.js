import express from "express"

import {  getQuestions } from "../controllers/question.controller.js"
import { createQuestions } from "../controllers/question.controller.js"

import { authmiddleware } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";


const router = express.Router();

router.get("/getquestions" , getQuestions);
router.post("/createquestions" ,authmiddleware, isAdmin, createQuestions);

export default router;