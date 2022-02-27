const mongoose = require("mongoose");
const mySchema = mongoose.Schema({
	GroupName: {
		type: String,
	},
	GroupMemebers: [],
	createdBy: {
		type: String,
	},
});

module.exports = mongoose.model("groups", mySchema);
