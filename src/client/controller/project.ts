import express, { Request, Response } from "express";
import { asyncWrapper, R } from "@helpers/response-helpers";
import { UserAuthRequest } from "@middleware/auth";
import Joi from "joi";
import models from "@model/index";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "@config/env";
import db from "@db/mysql";

export default {
	test: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		return R(res, true, "Test Route from Auth");
	}),

	list: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		//pagination options
		const opt = {
			page: parseInt(req.query.page?.toString() || "0"),
			limit: parseInt(req.query.limit?.toString() || "10"),
		};

		const projects = await models.projects.findAndCountAll({
			attributes: [
				"id",
				"project_name",
				"project_image",
				"created",
				"enddate",
				"description",
				[
					db.sequelize.literal(
						`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
					),
					"bids_count",
				],
			],
			limit: opt.limit,
			offset: opt.page * opt.limit,
		});

		let list = projects.rows;
		let count = projects.count;

		return R(res, true, "project list", list, {
			current_page: opt.page,
			total_count: count,
			total_pages: Math.floor(count / opt.limit),
		});
	}),
};
