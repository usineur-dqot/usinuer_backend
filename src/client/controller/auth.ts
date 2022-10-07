import express, { Request, Response } from "express";
import { asyncWrapper, R } from "@helpers/response-helpers";
import { UserAuthRequest } from "@middleware/auth";
import Joi from "joi";
import models from "@model/index";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "@config/env";
import { Validate } from "@validation/utils";
import schema from "@validation/schema";
import { uploadFile, uploadOneFile } from "@helpers/upload";
import moment from "moment";

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
			data["country_code"] = 74;
			data.password = bcrypt.hashSync(data.password, 10);

			objectToBeDeleted.forEach((f) => delete data[f]);

			let user = await models.users.create(data);

			const token = jwt.sign({ id: user.id }, env.secret);

			let u: any = user.toJSON();
			delete u.password;
			u["token"] = token;

			return R(res, true, "Registered", u);
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
				// password_confirmation: Joi.any()
				// 	.equal(Joi.ref("password"))
				// 	.required()
				// 	.messages({ "any.only": "{{#label}} does not match" }),
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
			data["country_code"] = 74;
			data.password = bcrypt.hashSync(data.password, 10);
			[...objectToBeDeleted, "password_confirmation"].forEach(
				(f) => delete data[f],
			);

			let user = await models.users.create(data);

			const token = jwt.sign({ id: user.id }, env.secret);

			let u: any = user.toJSON();
			delete u.password;
			u["token"] = token;

			return R(res, true, "Registered", u);
		}
	}),

	login: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		//validation
		const schema = Joi.object({
			email_username: Joi.string().required(),
			password: Joi.string().required(),
		}).validate(req.body);

		if (schema.error) {
			return R(res, false, schema.error.message);
		}

		let data = schema.value;

		let user = await models.users.findOne({
			where: {
				[Op.or]: [
					{
						email: data.email_username,
					},
					{
						user_name: data.email_username,
					},
				],
			},
		});

		if (!user) {
			return R(res, false, "Invalid Credentials");
		}

		if (!bcrypt.compareSync(data.password, user.password || "")) {
			return R(res, false, "Invalid Credentials.");
		}
		let current_date = new Date();
		user.last_seen = current_date;

		await user.save();

		await models.login_info.create({
			user_id: user.id,
			ip_address: `${req.headers["x-forwarded-for"]}`.split(",")[0] || "",
		});

		const token = jwt.sign({ id: user.id }, env.secret);

		let u: any = user.toJSON();
		delete u.password;
		u["token"] = token;

		return R(res, true, "Logged in successfully", u);
	}),

	me: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		let user = await models.users.findOne({
			where: {
				id: req.user?.id,
			},
			include: [
				{
					model: models.country,
					as: "country_code_country",
				},
			],
			attributes: { exclude: ["password"] },
		});

		if (!user) {
			return R(res, false, "Invalid User");
		}
		return R(res, true, "User data", user);
	}),

	update: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(res, [], schema.user.editUser, req.body, {});

		let user = await models.users.findOne({
			where: {
				id: req.user?.id,
			},
		});

		if (!user) {
			return R(res, false, "Invalid user");
		}

		let country = await models.country.findOne({
			where: {
				id: data.country_code,
			},
		});

		if (!country) {
			return R(res, false, "Invalid country");
		}
		let file;

		if (req.query?.change_pic) {
			// file upload
			file = await uploadOneFile(req, res);
		}

		if (file) {
			data["prof_pic"] = file;
		}

		data["country_code"] = country.id;
		data["country_symbol"] = country.country_symbol;

		await user.update(data);
		// await user.save();

		return R(res, true, "profile updated");
	}),

	change_password: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(
			res,
			[],
			schema.user.change_password,
			req.body,
			{},
		);

		let user = await models.users.findOne({
			where: {
				id: req.user?.id,
			},
		});

		if (!user) {
			return R(res, false, "Invalid user");
		}

		if (!bcrypt.compareSync(data.old_password, user.password || "")) {
			return R(res, false, "Old Password is not correct.");
		}

		user.password = bcrypt.hashSync(data.new_password, 10);

		await user.save();

		return R(res, true, "Password Changed");
	}),

	list_countries: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		let countries = await models.country.findAll({});

		return R(res, true, "country data", countries);
	}),
};
