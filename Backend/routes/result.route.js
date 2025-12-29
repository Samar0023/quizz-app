import express from "express"
import { getResult } from "../controllers/result.controller.js";
import { authmiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();


router.post("/submitresult" , authmiddleware,  getResult );

export default router;