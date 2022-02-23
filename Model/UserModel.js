const mongoose = require("mongoose");

const mySchema = mongoose.Schema(
	{
		fullName: {
			type: String,
		},

		email: {
			type: String,
		},
		password: {
			type: String,
		},

		image: {
			type: String,
		},
	},
	{ timeStamps: true },
);

module.exports = mongoose.model("usercol", mySchema);
