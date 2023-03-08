const asyncWrapper = require("../middleware/async");
const isAuth = require("../middleware/auth");
const router = require("express").Router();
const passport = require("passport");
const Customer = require("../models/customer");
const genPassword = require("../middleware/passwordUtils").genPassword;

const showHome = asyncWrapper(async (req, res) => {
	res.status(200).render("../public/customers/htmlfiles/home.ejs", {
		username: req.user.username
	});
});

module.exports = {
	showHome
};
