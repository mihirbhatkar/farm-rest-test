// const connectDB = require("./config/database");
require("./config/database");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
var passport = require("passport");
var routes = require("./routes/routes");
const notFound = require("./middleware/not-found-page");
const errorHandler = require("./middleware/error-handler");

const connection = require("./config/database");

const MongoStore = require("connect-mongo")(session);

require("dotenv").config();

var app = express();

const port = process.env.PORT || 5000;
app.set("view engine", "ejs");

// express.static("./public");
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new MongoStore({
	mongooseConnection: mongoose.connection,
	collection: "sessions"
});

app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
		store: sessionStore,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24
		}
	})
);

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
	try {
		await connection(process.env.MONGO_URI);
		app.listen(port, () => {
			console.log(`server @ http://localhost:${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
