const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
	getLoginPage,
	getSignUpPage,
	signUpCustomer
} = require("../controllers/login");

router
	.route("/")
	.get(getLoginPage)
	.post(
		passport.authenticate("local", {
			failureRedirect: "/login-failure",
			successRedirect: "/customer"
		})
	);

router.get("/logout", (req, res, next) => {
	req.session.destroy(function (err) {
		res.redirect("/");
	});
});

router.get("/login-failure", (req, res, next) => {
	res.send("You entered the wrong password.");
});

router.route("/signup").get(getSignUpPage).post(signUpCustomer);

module.exports = router;
