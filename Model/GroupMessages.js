const mongoose = require("mongoose");
const mySchema = mongoose.Schema(
	{
		message: {
			type: String,
		},
		createdBy: {
			type: String,
		},
		individualID: {
			type: String,
		},
	},
	{ timestamp: true },
);

module.exports = mongoose.model("groupmessage", mySchema);
