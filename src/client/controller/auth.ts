import express, { Request, Response } from "express";
import { asyncWrapper, R } from "@helpers/response-helpers";
import { UserAuthRequest } from "@middleware/auth";
import Joi from "joi";
import models from "@model/index";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";

export default {
	test: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		return R(res, true, "Test Route from Auth");
	}),

	register: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		//validation
		const schema = Joi.object({
			role: Joi.number().required(),
			email: Joi.string().required(),
			check: Joi.boolean().required(),
		})
			.unknown(true)
			.validate(req.body);

		if (schema.error) {
			return R(res, false, schema.error.message);
		}

		let data = schema.value;

		let objectToBeDeleted = ["role", "check"];

		// Check if data["check"] is true
		if (data.check) {
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
		} else if (data.role === 1) {
			//user is customer

			//machinist validation
			const schema = Joi.object({
				account: Joi.string().required(),
				name: Joi.string().required(),
				surname: Joi.string().required(),
				user_name: Joi.string().required(),
				email: Joi.string().required(),
				password: Joi.string()
					.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
					.required()
					.messages({
						"string.pattern.base":
							"Password must contains at least 6 characters, including UPPER or lowercase with numbers.",
					}),
			})
				.unknown(true)
				.validate(req.body);

			if (schema.error) {
				return R(res, false, schema.error.message);
			}

			let data = schema.value;

			let userExist = await models.users.count({
				where: {
					[Op.or]: [
						{
							user_name: data.user_name,
						},
						{
							email: data.email,
						},
					],
				},
			});

			if (userExist > 0) {
				return R(res, false, "Username or Email already exists");
			}

			data["role_id"] = 1;
			data.password = bcrypt.hashSync(data.password);

			objectToBeDeleted.forEach((f) => delete data[f]);

			let user = await models.users.create(data);

			return R(res, true, "Registered", user);
		} else if (data.role === 2) {
			//user is machinist

			//machinist validation
			const schema = Joi.object({
				user_name: Joi.string().required(),
				email: Joi.string().required(),
				password: Joi.string()
					.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
					.required()
					.messages({
						"string.pattern.base":
							"Password must contains at least 6 characters, including UPPER or lowercase with numbers.",
					}),
				password_confirmation: Joi.any()
					.equal(Joi.ref("password"))
					.required()
					.messages({ "any.only": "{{#label}} does not match" }),
				name: Joi.string().required(),
				surname: Joi.string().required(),
				address1: Joi.string().required(),
				zcode: Joi.string().required(),
				city: Joi.string().required(),
				company_name: Joi.string().required(),
				company_number: Joi.string().required(),
				Squestion: Joi.string().required(),
				answer: Joi.string().required(),
			})
				.unknown(true)
				.validate(req.body);

			if (schema.error) {
				return R(res, false, schema.error.message);
			}

			let data = schema.value;

			let userExist = await models.users.count({
				where: {
					[Op.or]: [
						{
							user_name: data.user_name,
						},
						{
							email: data.email,
						},
					],
				},
			});

			if (userExist > 0) {
				return R(res, false, "Username or Email already exists");
			}

			data["role_id"] = 2;
			data.password = bcrypt.hashSync(data.password);
			[...objectToBeDeleted, "password_confirmation"].forEach(
				(f) => delete data[f],
			);

			let user = await models.users.create(data);

			return R(res, true, "Registered", user);
		}
	}),
};
