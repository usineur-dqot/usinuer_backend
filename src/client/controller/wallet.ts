import { Response } from "express";
import { asyncWrapper, R } from "@helpers/response-helpers";
import { UserAuthRequest } from "@middleware/auth";
import models from "@model/index";
import db from "@db/mysql";
import { uploadFile, uploadOneFile } from "@helpers/upload";
import { Pick, Validate } from "validation/utils";
import schema from "validation/schema";
import moment from "moment";
import { Op } from "sequelize";
import axios from "axios";
import paypal from "paypal-rest-sdk";

paypal.configure({
	mode: "sandbox",
	client_id:
		"AdttYSVnm8UEVFoLjLFNdUXxpAX8DOZxpXU4QvU50_1X6lTy0lvfO99-dG921aPbbIaVddVZtLs7dcbG",
	client_secret:
		"EK6ldhLwJKJRZtSpZO7zXiMMPhFKsH8YLSzQ9kOqgUuBliotfEIt3ImUY9nacz46OQHYlCqhohlnEB8o",
});

export default {
	test: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		res.send("Hello from wallet ");
	}),
	create_order: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation

		let orderId = "9WN50236EH272062K";

		var create_payment_json = {
			intent: "sale",
			payer: {
				payment_method: "paypal",
			},
			redirect_urls: {
				return_url: "http://return.url",
				cancel_url: "http://cancel.url",
			},
			transactions: [
				{
					item_list: {
						items: [
							{
								name: "item",
								sku: "item",
								price: "1.00",
								currency: "USD",
								quantity: 1,
							},
						],
					},
					amount: {
						currency: "USD",
						total: "1.00",
					},
					description: "This is the payment description.",
				},
			],
		};

		paypal.payment.create(create_payment_json, function (error, payment) {
			if (error) {
				return R(res, false, error.message, error);
			} else {
				console.log("Create Payment Response");
				return R(res, true, "Order Created", payment);
			}
		});

		// let response_data = await axios.post("",{
		// 	order_id: data.order_id
		// },)
	}),
};
