import express, { Request, Response } from "express";
import cn from "@client/controller/project";
import upload from "express-fileupload";

const router = express.Router();

router.get("/test", cn.test);

router.get("/list", cn.list);

router.get("/my", cn.my);

router.get("/detail", cn.show);

router.post("/ask-question", cn.askQuestion);

router.post("/get-temp", cn.get_temp);

router.get("/get-my-temp", cn.get_my_temp);

router.use(upload());
router.post("/add", cn.add);
router.post("/add-temp", cn.add_temp);
router.post("/add-bid", cn.add_bid);

export default router;
