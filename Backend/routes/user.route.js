import express from "express"

import {  signup , login , logout } from "../controllers/user.controller.js"

import { authmiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup" , signup);
router.post("/login" , login);
router.post("/logout", logout);
router.get("/profile", authmiddleware , (req,res) => {
    res.json(req.user);
});


export default router;