module.exports.isAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.send("you are not authorized!");
	}
};
