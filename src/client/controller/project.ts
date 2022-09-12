import { Response } from "express";
import { asyncWrapper, R } from "@helpers/response-helpers";
import { UserAuthRequest } from "@middleware/auth";
import models from "@model/index";
import db from "@db/mysql";
import { uploadFile } from "@helpers/upload";
import { Validate } from "validation/utils";
import schema from "validation/schema";
import moment from "moment";
import { Op } from "sequelize";

export default {
	test: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		return R(res, true, "Test Route from Auth");
	}),

	list: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		//pagination options
		const opt = {
			page: parseInt(req.query.page?.toString() || "0"),
			limit: parseInt(req.query.limit?.toString() || "10"),
			user_id: req.query.user_id?.toString() || null,
		};

		let userQuery = opt.user_id
			? {
					creator_id: opt.user_id,
			  }
			: {};

		const projects = await models.projects.findAndCountAll({
			where: {
				...userQuery,
			},
			include: [
				{
					model: models.project_images,
					as: "project_images",
					where: {
						project_id: { [Op.col]: "projects.id" },
					},
					required: false,
				},
				{
					model: models.users,
					as: "creator",
					attributes: ["email", "user_name"],
					required: false,
				},
			],
			attributes: [
				"id",
				"project_name",
				"project_image",
				"created",
				"enddate",
				"description",
				"project_status",
				"visibility",
				"project_post_date",
				"post_for",
				"createdAt",
				[
					db.sequelize.literal(
						`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
					),
					"bids_count",
				],
			],
			limit: opt.limit,
			offset: opt.page * opt.limit,
			order: [["createdAt", "DESC"]],
		});

		let list = projects.rows;
		let count = projects.count;

		return R(res, true, "project list", list, {
			current_page: opt.page,
			total_count: count,
			total_pages: Math.floor(count / opt.limit),
		});
	}),
	show: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		//pagination options
		let project_id = req.query.id;

		if (!project_id) {
			return R(res, false, "please provide a project ID");
		}

		const project = await models.projects.findOne({
			where: {
				id: project_id.toString(),
			},
			include: [
				{
					model: models.project_images,
					as: "project_images",
					where: {
						project_id: { [Op.col]: "projects.id" },
					},
					required: false,
				},
				{
					model: models.users,
					as: "creator",
					attributes: ["email", "user_name"],
					required: false,
				},

				{
					model: models.prebid_messages,
					as: "prebid_messages",
					where: {
						project_id: { [Op.col]: "projects.id" },
					},
					required: false,
				},
			],

			attributes: {
				include: [
					[
						db.sequelize.literal(
							`(SELECT COUNT(*) FROM bids WHERE project_id = projects.id)`,
						),
						"bids_count",
					],
				],
			},
		});

		if (!project) {
			return R(res, false, "No project found");
		}

		return R(res, true, "project details", project);
	}),
	askQuestion: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(
			res,
			["project_id", "message"],
			schema.project.question,
			req.body,
			{},
		);

		let user = await models.users.findByPk(req.user?.id, {
			attributes: ["id"],
		});

		if (!user) {
			return R(res, false, "Invalid user");
		}

		let project = await models.projects.findByPk(data.project_id, {
			attributes: ["id", "creator_id"],
		});

		if (!project) {
			return R(res, false, "Project not found");
		}

		data["from_id"] = user.id;
		data["to_id"] = project.creator_id;
		data["msg_type"] = "Q";

		let question = await models.prebid_messages.create(data);

		return R(res, true, "Question Submitted", question);
	}),
	add: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(
			res,
			["project_name", "description", "visibility", "post_for"],
			schema.project.addProject,
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

		// file upload
		let files = await uploadFile(req, res);

		if (data.visibility.toLowerCase() == "private") {
			data["pro_job"] = 1;
		} else {
			data["pro_job"] = 0;
		}
		data["country_code"] = 2;
		data["creator_id"] = user.id;
		data["project_post_date"] = moment().format("YYYY MM DD");
		data["post_for"] = moment().add(data.post_for, "days").unix();
		// project_exp_date = YYYY MM DD

		let project = await models.projects.create(data);

		let imageData = files.map((m: any) => {
			return {
				project_id: project.id,
				project_name: project.project_name,
				project_post_date: moment().format(),
				cust_id: user?.id,
				attach_file: m,
			};
		});

		let project_images = await models.project_images.bulkCreate(imageData);

		return R(res, true, "Project Added Successfully", {
			project,
			project_images,
		});
	}),
};
