const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Customer = require("../models/customer.js");
const validPassword = require("../middleware/passwordUtils").validPassword;

const verifyCallback = (username, password, done) => {
	Customer.findOne({ username: username })
		.then((user) => {
			if (!user) {
				return done(null, false);
			}

			const isValid = validPassword(password, user.hash, user.salt);
			console.log(isValid);
			if (isValid) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		})
		.catch((err) => {
			done(err);
		});
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((userId, done) => {
	Customer.findById(userId)
		.then((user) => {
			done(null, user);
		})
		.catch((err) => done(err));
});
