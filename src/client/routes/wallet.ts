import express, { Request, Response } from "express";
import cn from "@client/controller/wallet";
import upload from "express-fileupload";

const router = express.Router();

router.get("/test", cn.test);

router.get("/create-order", cn.create_order);

/*FILE UPLOAD APIs */
router.use(upload());

export default router;
