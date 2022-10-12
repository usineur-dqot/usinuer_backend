import express, { Request, Response } from "express";
import cn from "@client/controller/auth";
import upload from "express-fileupload";

const router = express.Router();

router.get("/test", cn.test);

router.post("/register", cn.register);

router.post("/login", cn.login);

router.get("/me", cn.me);

router.post("/change-password", cn.change_password);

router.get("/countries", cn.list_countries);

/*FILE UPLOAD APIs */
router.use(upload());

router.post("/update-profile", cn.update);

router.post("/update-address", cn.update_address);


export default router;
