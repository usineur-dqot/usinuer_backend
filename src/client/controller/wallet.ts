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
import paypal from "paypal-rest-sdk"

export default {

    add_payment: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		
		// validation
		let data = await Validate(
			res,
			[],
			schema.project.payment_req,
			req.body,
			{},
		);
		let user = await models.users.findByPk(req.user?.id);

		if (!user) {
			return R(res, false, "Invalid user");
		}

		
		// let response_data = await axios.post("",{
		// 	order_id: data.order_id
		// },)

		if(){

			await db.sequelize.transaction(async () => {

				let transaction_id = "TXN" + Math.floor(Math.random() * 1000000000);



				
					let paymentData = {
						reference_id: data.referenceId,
						deposit_description: "",
						withdraw_description: "",
						is_deposit_enabled: 123,
						is_withdraw_enabled: 123,
						deposit_minimum: 132,
						withdraw_minimum: 1234,
						mail_id: "",
						url: "",
						commission: 1234,
						is_enable: 1234,
						url_status: 132,
		
						
						
					};
				
	







			});
			 





		}




		
	}),







}