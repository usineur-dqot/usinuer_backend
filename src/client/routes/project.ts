import express, { Request, Response } from "express";
import cn from "@client/controller/project";

const router = express.Router();

router.get("/test", cn.test);

router.get("/list", cn.list);

export default router;
