import express, { Request, Response } from "express";
import cn from "@client/controller/project";
import upload from "express-fileupload";

const router = express.Router();

router.get("/test", cn.test);

router.get("/list", cn.list);

router.get("/my", cn.my);

router.get("/detail", cn.show);

router.post("/ask-question", cn.askQuestion);

router.post("/add-answer", cn.addAnswer);

router.post("/get-temp", cn.get_temp);

router.get("/get-my-temp", cn.get_my_temp);

router.get("/select-machinist", cn.select_machinist);

router.get("/list-msgs", cn.list_msgs);

router.get("/list-bid-msgs", cn.list_bid_msgs);

router.get("/my-inbox-msgs", cn.my_msgs);

/*FILE UPLOAD APIs */
router.use(upload());

router.post("/add", cn.add);

router.post("/add-temp", cn.add_temp);

router.post("/add-bid", cn.add_bid);

router.post("/update-bid", cn.update_bid);

router.post("/send-msg", cn.send_msg);

router.post("/send-bid-msg", cn.send_bid_msg);

export default router;
