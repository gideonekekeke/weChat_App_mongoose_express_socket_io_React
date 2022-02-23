const express = require("express");
const router = express.Router();
const chat = require("../Model/ChatModel");

router.get("/", async (req, res) => {
	try {
		const getUser = await chat.find();

		res.status(200).json(getUser);
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});

router.post("/", async (req, res) => {
	const { chats, senderID, SendTo } = req.body;
	try {
		const PostUser = await chat.create({
			chats,
			senderID,
			SendTo,
		});

		return res.status(200).json(PostUser);
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});
router.delete("/:id", async (req, res) => {
	try {
		const removeChats = await chat.findByIdAndRemove(req.params.id, req.body);
		return res.status(200).json(removeChats);
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});

module.exports = router;
