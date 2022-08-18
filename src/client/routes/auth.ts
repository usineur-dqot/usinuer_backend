import express, { Request, Response } from "express";
import cn from "../controller/auth";

const router = express.Router();

router.get("/test", cn.test);

router.post("/register", cn.register);

export default router;
