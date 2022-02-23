const mongoose = require("mongoose");
const mySchema = mongoose.Schema({
	chats: {
		type: String,
	},
	senderID: {
		type: String,
	},
	SendTo: {
		type: String,
	},
});

module.exports = mongoose.model("chats", mySchema);
