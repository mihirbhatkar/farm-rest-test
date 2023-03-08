const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "must provide username"],
		trim: true,
		maxlength: [20, "name must be less than 20 characters"]
	},
	address: {
		type: String,
		required: [true, "must provide address"]
	},
	phone: {
		type: Number,
		required: [true, "must provide phone number"]
	},
	email: {
		type: String,
		required: [true, "must provide email"]
	},
	hash: String,
	salt: String
});

module.exports = mongoose.model("Customer", CustomerSchema);
