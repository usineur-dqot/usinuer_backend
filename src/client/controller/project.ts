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
					attributes: ["email", "user_name", "role_id"],
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
				"programmer_id",
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
	my: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		//pagination options
		const opt = {
			page: parseInt(req.query.page?.toString() || "0"),
			limit: parseInt(req.query.limit?.toString() || "100"),
			user_id: req.query.user_id?.toString() || null,
		};

		let user = await models.users.findByPk(req.user?.id, {
			attributes: ["id", "role_id"],
		});

		if (!user) {
			return R(res, false, "Invalid user");
		}
		if (user.role_id == 1) {
			const projects = await models.projects.findAndCountAll({
				where: {
					creator_id: user.id,
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
		} else if (user.role_id == 2) {
			let status = req.query.status;

			if (!status) {
				return R(res, false, "please provide a status");
			}

			if (status == "1") {
				const projects = await models.projects.findAndCountAll({
					where: {
						programmer_id: user.id,
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
			} else if (status == "2") {
				let bids = await models.bids.findAll({
					where: {
						user_id: user.id,
					},
					attributes: ["id", "user_id", "project_id"],
				});

				if (!bids.length) {
					return R(res, true, "No Data Found", []);
				}

				let ids = bids.map((b) => b.project_id);

				const projects = await models.projects.findAndCountAll({
					where: {
						programmer_id: user.id,
						id: {
							[Op.in]: ids,
						},
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
			} else {
				const projects = await models.projects.findAndCountAll({
					where: {
						programmer_id: user.id,
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
			}
		} else {
			return R(res, false, "Invalid User");
		}
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
					model: models.bids,
					as: "bids",
					where: {
						project_id: { [Op.col]: "projects.id" },
					},
					include: [
						{
							model: models.users,
							as: "user",
							attributes: ["email", "user_name"],
							required: false,
						},
						// {
						// 	model: models.messages,
						// 	as: "messages",
						// 	where:{
						// 		project_id: { [Op.col]: "projects.id" },
						// 		[Op.or]: [
						// 			{
						// 				to_id: { [Op.col]: "projects.bids.user_id" },
						// 				from_id: {[Op.col]: "projects.creator_id" },
						// 			},
						// 			{
						// 				to_id: {[Op.col]: "projects.creator_id"},
						// 				from_id: { [Op.col]: "projects.bids.user_id" },
						// 			},
						// 		],
						// 	},
						// 	limit:2,
						// 	required: false,

						// },
					],
					required: false,
				},
				{
					model: models.users,
					as: "creator",
					attributes: ["email", "user_name"],
					required: false,
				},
				{
					model: models.users,
					as: "programmer",
					attributes: ["email", "user_name"],
					required: false,
				},
				{
					model: models.prebid_messages,
					as: "prebid_messages",
					where: {
						project_id: { [Op.col]: "projects.id" },
					},
					include: [
						{
							model: models.users,
							as: "from",
							attributes: ["email", "user_name"],
							required: false,
						},
					],
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

	addAnswer: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(res, [], schema.project.answer, req.body, {});

		let user = await models.users.findByPk(req.user?.id, {
			attributes: ["id"],
		});

		if (!user) {
			return R(res, false, "Invalid user");
		}

		let question = await models.prebid_messages.findByPk(data.id);

		if (!question) {
			return R(res, false, "Question Not Found", null);
		}

		let q = question.toJSON();

		let answer = await models.prebid_messages.create({
			project_id: q.project_id,
			reply_for: q.id,
			from_id: user.id,
			to_id: q.from_id,
			message: data.message,
			msg_type: "A",
		});

		return R(res, true, "Answer Submitted", answer);
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

	add_temp: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(
			res,
			["project_name", "description", "visibility", "post_for"],
			schema.project.addProject,
			req.body,
			{},
		);

		let temp_id = req.query?.temp_id;
		let project: any;

		if (temp_id) {
			project = await models.projects_temp.findByPk(temp_id?.toString());
			if (!project) {
				return R(res, false, "Invalid Project");
			}
		}

		// file upload
		let files = await uploadFile(req, res);

		if (data.visibility.toLowerCase() == "private") {
			data["pro_job"] = 1;
		} else {
			data["pro_job"] = 0;
		}
		data["country_code"] = 2;
		data["creator_id"] = 0;
		data["project_post_date"] = moment().format("YYYY MM DD");
		data["post_for"] = moment().add(data.post_for, "days").unix();
		// project_exp_date = YYYY MM DD

		if (project) {
			data["images"] = [...project.images, ...files];
			return R(res, true, "Project will be posted after you log in", project);
		} else {
			data["images"] = files;
		}

		project = await models.projects_temp.create(data);

		return R(res, true, "Project will be posted after you log in", project);
	}),
	add_bid: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(res, [], schema.project.addBid, req.body, {});

		if (req.user?.id != data.user_id) {
			return R(res, false, "	Invalid	User");
		}

		let project = await models.projects.findByPk(data.project_id);

		if (!project) {
			return R(res, false, "Invalid Project");
		}

		if (project.programmer_id) {
			return R(res, false, "Job already assigned to a machinist");
		}

		// file upload
		let file = await uploadOneFile(req, res, true);

		if (file) {
			data["bid_file"] = file;
		}

		let bid = await models.bids.create(data);

		return R(res, true, "Offer Submitted", bid);
	}),

	update_bid: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(res, [], schema.project.updateBid, req.body, {});

		if (req.user?.id != data.user_id) {
			return R(res, false, "	Invalid	User");
		}

		let bid_id = req.query?.id || "";

		if (!bid_id) {
			return R(res, false, "No Bid ID Found");
		}

		let bid = await models.bids.findByPk(bid_id.toString());

		if (!bid) {
			return R(res, false, "No Bid Found");
		}

		// file upload
		let file = await uploadOneFile(req, res, true);

		if (file) {
			data["bid_file"] = file;
		}

		await bid.update(data);

		return R(res, true, "Offer updated", bid);
	}),

	select_machinist: asyncWrapper(
		async (req: UserAuthRequest, res: Response) => {
			// validation
			let data = await Validate(
				res,
				[],
				schema.project.select_machinist,
				req.query,
				{},
			);

			let project = await models.projects.findByPk(data.project_id, {
				attributes: ["id", "programmer_id"],
			});

			if (!project) {
				return R(res, false, "Invalid Project");
			}

			if (project.programmer_id) {
				return R(res, false, "Job already assigned to a machinist");
			}

			let user = await models.users.findByPk(data.programmer_id, {
				attributes: ["id"],
			});

			if (!user) {
				return R(res, false, "Invalid	 user");
			}

			let bid = await models.bids.findByPk(data.bid_id);

			if (!bid) {
				return R(res, false, "Invalid	 Bid");
			}

			project.programmer_id = user.id;

			await project.save();

			if (!req.user?.id) {
				return R(res, false, "");
			}

			let transaction = await models.transactions.create({
				amount: bid.bid_amount || 0,
				amount_gbp: bid.bid_amount_gbp || 0,
				type: "PROJECT AWARDED",

				// customer id
				creator_id: req.user?.id,
				buyer_id: req.user?.id,

				// machinist id
				provider_id: user.id,
				reciever_id: user.id,

				status: "PENDING",
				description: "Selected the machinist",
				project_id: project.id,
			});

			return R(res, true, "Machinist selected");
		},
	),

	add_payment: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(
			res,
			[],
			schema.project.add_payment,
			req.body,
			{},
		);

		let project = await models.projects.findByPk(data.project_id);

		if (!project) {
			return R(res, false, "Project not found");
		}

		let transaction_details = await models.transactions.findOne({
			where: {
				project_id: data.project_id,
			},
		});
		if (!transaction_details) {
			return R(res, false, "Invalid  transaction");
		}
		// let old_amount = transaction_details.amount_gbp;
		// if (old_amount != data.amount) {
		// 	return R(res, false, "Invalid  amount");
		// }

		await transaction_details.update({
			amount: data.amount,
			amount_gbp: transaction_details.amount_gbp,
			type: "DEPOSIT FUND",

			status: "SUCCESS",
			description: "PAYMENT IS DONE ",
		});

		project.project_status = "1";

		await project.save();

		return R(res, true, "Payment is done ", { project });
	}),

	review_machinist: asyncWrapper(
		async (req: UserAuthRequest, res: Response) => {
			// validation
			let data = await Validate(
				res,
				[],
				schema.project.review_machinist,
				req.body,
				{},
			);

			let project = await models.projects.findByPk(data.project_id);

			if (!project || !project.programmer_id) {
				return R(res, false, "Project not found");
			}

			let review = await models.reviews.create({
				comments: data.comments,
				project_id: data.project_id,
				buyer_id: req.user?.id || 0,
				provider_id: project.programmer_id,
			});

			project.project_status = "3";

			await project.save();

			return R(res, true, "review submitted ", { project });
		},
	),

	list_msgs: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(res, [], schema.project.list_msgs, req.query, {});

		let project = await models.projects.findByPk(data.project_id, {
			attributes: ["id", "programmer_id", "project_name"],
		});

		if (!project) {
			return R(res, false, "Invalid Project");
		}

		let to = await models.users.findByPk(
			data.to_id == req.user?.id ? data.from_id : data.to_id,
			{
				attributes: ["user_name"],
			},
		);

		let messages = await models.messages.findAll({
			where: {
				project_id: data.project_id,
				[Op.or]: [
					{
						to_id: data.to_id,
						from_id: data.from_id,
					},
					{
						to_id: data.from_id,
						from_id: data.to_id,
					},
				],
			},
			order: [["created", "DESC"]],
		});

		return R(res, true, "Messages list", messages, { to, project });
	}),

	my_msgs: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation

		let user = await models.users.findByPk(req.user?.id);

		if (!user) {
			return R(res, false, "Invalid user");
		}

		let messages = await models.messages.findAll({
			where: {
				[Op.or]: [
					{
						from_id: req.user?.id,
					},
					{
						to_id: req.user?.id,
					},
				],
			},
			include: [
				{
					model: models.projects,
					as: "project",
					attributes: ["project_name"],
				},
				{
					model: models.users,
					as: "from",
					attributes: ["email", "user_name"],
					required: false,
				},
				{
					model: models.users,
					as: "to",
					attributes: ["email", "user_name"],
					required: false,
				},
			],
			group: ["project_id"],
			order: [["created", "DESC"]],
		});

		return R(res, true, "Messages list", messages);
	}),
	send_msg: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(res, [], schema.project.send_msg, req.body, {});

		let project = await models.projects.findByPk(data.project_id);

		if (!project) {
			return R(res, false, "Invalid Project");
		}

		// file upload
		let file = await uploadOneFile(req, res, true);

		if (file) {
			data["attach_file"] = file;
		}

		data["created"] = moment().unix();
		data["from_id"] = req.user?.id;
		data["reply_for"] = 0;

		let message = await models.messages.create(data);

		return R(res, true, "Message Sent", message);
	}),
	list_bid_msgs: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(
			res,
			[],
			schema.project.list_bid_msgs,
			req.query,
			{},
		);

		let project = await models.projects.findByPk(data.project_id, {
			attributes: ["id", "programmer_id"],
		});

		if (!project) {
			return R(res, false, "Invalid Project");
		}

		let messages = await models.message_dialog.findAll({
			where: {
				project_id: data.project_id,
				[Op.or]: [
					{
						send_to: data.send_to,
						send_from: req.user?.id,
					},
					{
						send_to: req.user?.id,
						send_from: data.send_to,
					},
				],
			},
			order: [["datetime", "DESC"]],
		});

		return R(res, true, "Messages list", messages);
	}),
	send_bid_msg: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(
			res,
			[],
			schema.project.send_bid_msg,
			req.body,
			{},
		);

		let project = await models.projects.findByPk(data.project_id);

		if (!project) {
			return R(res, false, "Invalid Project");
		}

		// file upload
		let file = await uploadOneFile(req, res, true);

		if (file) {
			data["attachment"] = file;
		}

		data["send_from"] = req.user?.id;

		let message = await models.message_dialog.create(data);

		return R(res, true, "Message Sent", message);
	}),

	get_my_temp: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(
			res,
			["project_id"],
			schema.project.get_my_temp,
			req.query,
			{},
		);

		let temp_project = await models.projects_temp.findOne({
			where: {
				id: data.project_id,
				creator_id: {
					[Op.eq]: 0,
				},
			},
		});

		if (!temp_project) {
			return R(res, false, "no data available to post");
		}

		return R(res, true, "Temp Project Found", temp_project);
	}),
	get_temp: asyncWrapper(async (req: UserAuthRequest, res: Response) => {
		// validation
		let data = await Validate(
			res,
			["project_ids"],
			schema.project.get_temp,
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

		let temp_projects = await models.projects_temp.findAll({
			where: {
				id: {
					[Op.in]: data.project_ids,
				},
				creator_id: {
					[Op.eq]: 0,
				},
			},
		});

		if (!temp_projects.length) {
			return R(res, false, "no data available to post");
		}

		for (let p of temp_projects) {
			let project: any = p.toJSON();
			let images: any = project.images;

			delete project.images;
			delete project.id;
			project.creator_id = user?.id;

			let entry = await models.projects.create(project);

			if (images && images?.length) {
				let imageData = images.map((m: any) => {
					return {
						project_id: entry.id,
						project_name: entry.project_name,
						project_post_date: moment().format(),
						cust_id: user?.id,
						attach_file: m,
					};
				});
				let project_images = await models.project_images.bulkCreate(imageData);
			}
		}

		return R(res, true, "Project Added Successfully", {});
	}),
};
