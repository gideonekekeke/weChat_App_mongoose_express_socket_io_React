const mongoose = require("mongoose");

const mySchema = mongoose.Schema(
	{
		FriendName: {
			type: String,
		},

		FriendImage: {
			type: String,
		},

		userId: {
			type: String,
		},

		Ids: {
			type: String,
		},
	},
	{ timeStamps: true },
);

module.exports = mongoose.model("friend", mySchema);
