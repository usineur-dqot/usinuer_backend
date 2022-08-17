import express from "express";
import figlet from "figlet";
import { errorHandler } from "../middleware/errorHanlder";
import cors from "cors";
import verifyUser from "@middleware/auth";
import env from "@config/env";
import routes from "./routes";
import morgan from "morgan";

const app = express();
app.use(cors({ origin: "*" }));

app.use(express.json());

app.use(morgan("tiny"));

app.use(verifyUser);

// app.use("/public", express.static(process.cwd()));

app.get("/v1", (req, res) => {
	res.send("hello");
});
app.use("/user/auth", routes.auth);

//static routes
// app.use(routes._public);

app.use(errorHandler);

app.listen(env.port, () => {
	figlet.text(
		"Harsh . js",
		{
			font: "Big",
		},
		function (err, data) {
			if (err) {
				console.log("Something went wrong...");
				console.dir(err);
				return;
			}

			console.log(data);
			console.log(`Listening 🤙 On PORT ${env.port} 🚀`);
		},
	);
});
