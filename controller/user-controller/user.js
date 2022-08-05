//const User = require("../../db/models/user");
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const { successResponse, errorResponse } = require("../../helpers/response/response");
const codes = require("../../helpers/response/httpStatusCodes");
const con = require("../../db/index");
const md5 = require('md5');


exports.Signup = async (req, res) => {
    console.log(req.body);
    /*try {

        let userExist = await User.findOne({ email: req.body.email });
        if(userExist) return errorResponse(res, "User already exist", codes.BadRequest);

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create user
        req.body.password = hashedPassword
        const user = await User.create(req.body);
        const responseUser = {name: user.name, email: user.email, phone: user.phone, user_type: user.user_type, status: user.status};

        successResponse(res, "success", responseUser);
    } catch (e) {
        errorResponse(res, "Server Error", codes.InternalServerError)
    }*/

}

exports.Signin = async(req,res) => {
	
    try{

        /*const user = await User.findOne({email: req.body.email })
        if(!user) return errorResponse(res, "User not found", codes.NotFound);
        const salt = await bcrypt.genSalt(10);
        bcrypt.compare(req.body.password, user.password).then((status) => {
            if(status) {
                const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
                successResponse(res,"logged in", token)
            } else {
                errorResponse(res, "password error", codes.Unauthorized);
            }
        })*/
		var email = req.body.email;
		var user_name = req.body.email;
		console.log(req.body);
		var password = req.body.password;
		var sql = 'SELECT * FROM `users` WHERE `user_name` = ? OR email = ?';
		con.query(sql,[user_name,email], (err, result) => {
			if (err) {
				console.log(err);
			} else {
				//console.log(result[0]);
				if(md5(password)==result[0].password){
					successResponse(res,"logged in", result[0]);
				}else{
					errorResponse(res, "password error", codes.Unauthorized);
				}
				//res.send(result);
			}
		});
		console.log('bbbbbbb');

    } catch(e) {
        errorResponse(res, "serversssssss error", codes.InternalServerError);
    }

}

/*exports.Profile = async(req,res) => {
    try {
        const user_id = req.user._id;
        console.log(user_id);
        const user = await User.findOne({ _id: user_id });
        if(!user) return errorResponse(res, "profile not found", codes.NotFound);
        let responseUser = {name: user.name, email: user.email, phone: user.phone, user_type: user.user_type, status: user.status};
        successResponse(res, "sucess", responseUser);
    } catch(e) {
        errorResponse(res, "server error", codes.InternalServerError);    
    }
}*/

