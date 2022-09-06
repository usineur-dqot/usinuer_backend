import express from "express";
import figlet from "figlet";
import { errorHandler } from "../middleware/errorHanlder";
import cors from "cors";
import verifyUser from "@middleware/auth";
import env from "@config/env";
import routes from "./routes";
import morgan from "morgan";

const app = express();

//cors
const corsOpts = {
	origin: "*",

	methods: ["GET", "POST"],

	allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

app.use(express.json());

// authentication
app.use(verifyUser);

// static routes
app.use(routes._public);

//logger
app.use(morgan("tiny"));

app.use("/user/auth", routes.auth);
app.use("/user/project", routes.project);
app.use("/user/upload", routes.upload);

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
