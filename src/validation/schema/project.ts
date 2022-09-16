import Joi from "joi";

export default {
	addProject: {
		project_name: Joi.string().required(),
		description: Joi.string().required(),
		visibility: Joi.string().required(),
		post_for: Joi.number().required(),
	},
	question: {
		project_id: Joi.string().required(),
		message: Joi.string().required(),
	},
	get_temp: {
		project_ids: Joi.array().min(1).required(),
	},
};
