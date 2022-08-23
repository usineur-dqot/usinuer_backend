import express, { Request, Response } from "express";
import cn from "@client/controller/project";
import upload from "express-fileupload";

const router = express.Router();

router.get("/test", cn.test);

router.get("/list", cn.list);

router.use(upload());
router.post("/add", cn.add);

export default router;
