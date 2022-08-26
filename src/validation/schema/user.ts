import Joi from "joi";

export default {
	editUser: {
		name: Joi.string().optional(),
		surname: Joi.string().optional(),
		user_name: Joi.string().optional(),
		zcode: Joi.string().optional(),
		city: Joi.string().optional(),
		country_code: Joi.number().optional(),
		address1: Joi.string().optional(),
		description: Joi.string().optional(),
	},
};
