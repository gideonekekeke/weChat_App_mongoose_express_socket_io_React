const GroupMessage = require("../Model/GroupMessages");

const express = require("express");
const router = express.Router();

router.get("/message/:id", async (req, res) => {
	try {
		const getUser = await GroupMessage.findById(req.params.id, req.body);

		res.status(200).json(getUser);
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});
router.get("/message", async (req, res) => {
	try {
		const getUser = await GroupMessage.find();

		res.status(200).json(getUser);
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});

router.post("/message", async (req, res) => {
	const { message, createdBy, individualID } = req.body;
	try {
		const PostUser = await GroupMessage.create({
			message,
			createdBy,
			individualID,
		});

		return res.status(200).json(PostUser);
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});
router.delete("/message/:id", async (req, res) => {
	try {
		const removeChats = await GroupMessage.findByIdAndRemove(
			req.params.id,
			req.body,
		);
		return res.status(200).json(removeChats);
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});

module.exports = router;
