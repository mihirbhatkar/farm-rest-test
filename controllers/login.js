const asyncWrapper = require("../middleware/async");
const router = require("express").Router();
const passport = require("passport");
const Customer = require("../models/customer");
const genPassword = require("../middleware/passwordUtils").genPassword;
const { createCustomError } = require("../errors/custom-error");
const getLoginPage = asyncWrapper(async (req, res) => {
	res.status(200).render("../public/customers/htmlfiles/login.ejs");
});

const getSignUpPage = asyncWrapper(async (req, res) => {
	res.status(200).render("../public/customers/htmlfiles/signup.ejs");
});
const signUpCustomer = asyncWrapper(async (req, res) => {
	const saltHash = genPassword(req.body.password);

	const salt = saltHash.salt;
	const hash = saltHash.hash;
	console.log(req.body);
	const newUser = new Customer({
		username: req.body.username,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address,
		hash: hash,
		salt: salt
	});
	console.log(newUser);
	newUser.save().then((user) => {
		console.log(user);
	});

	res.redirect("/customer");
});
module.exports = {
	getLoginPage,
	getSignUpPage,
	signUpCustomer
};
