import express, { Request, Response } from "express";
import { asyncWrapper, R } from "@helpers/response-helpers";
import { UserAuthRequest } from "@middleware/auth";
import Joi from "joi";
import models from "@model/index";

export default {
	test: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		return R(res, true, "Test Route from Auth");
	}),

	checkRegisteredUser: asyncWrapper(
		async (req: UserAuthRequest, res: Response) => {
			const schema = Joi.object({
				role: Joi.string().required(),
				email: Joi.string().required(),
			}).validate(req.body);

			if (schema.error) {
				return R(res, false, schema.error.message);
			}

			let data = schema.value;

			let role = await models.roles.findOne({
				where: {
					id: data.role,
				},
			});

			if (!role) {
				return R(res, false, "Invalid Role");
			}

			let userExist = await models.users.count({
				where: {
					email: data.email,
				},
			});

			if (userExist > 0) {
				return R(res, false, "You already have an Account");
			}

			return R(res, true, "Account can be created", {
				role: role,
			});
		},
	),
};
