import mail from "@config/mail";
import nodemailer from "nodemailer";

export async function sendMail(
	to: any,
	subject: any,
	html: any,
	isAsync = true,
	attachment = null,
) {
	const transporter = nodemailer.createTransport({
		auth: {
			user: mail.mailfrom,
			pass: mail.mailuserpwd,
		},
		tls: { ciphers: "SSLv3" },
	});

	let mailOption;
	mailOption = {
		from: mail.mailfrom,
		to: to,
		subject: subject,
		html: html,
	};

	if (isAsync) {
		await transporter.sendMail(mailOption, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent for verification: " + info.response);
			}
		});
	} else {
		return transporter.sendMail(mailOption);
	}
}
