import express, { Request, Response } from "express";
import path from "path";

const router = express.Router();
router.use("/public", express.static(path.join(process.cwd() + "/public")));

router.use("/public/*", (req, res) => {
	console.log(process.cwd() + "/public");
	res.redirect("/public/404.jpg");
});

export default router;
