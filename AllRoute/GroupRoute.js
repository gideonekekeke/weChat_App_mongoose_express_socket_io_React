const Group = require("../Model/GroupModel");

const express = require("express");
const router = express.Router();

router.get("/groups/:id", async (req, res) => {
	try {
		const getUser = await Group.findById(req.params.id, req.body);

		res.status(200).json(getUser);
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});
router.get("/groups", async (req, res) => {
	try {
		const getUser = await Group.find();

		res.status(200).json(getUser);
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});

router.post("/groups", async (req, res) => {
	const { GroupName, GroupMemebers, createdBy } = req.body;
	try {
		const PostUser = await Group.create({
			GroupName,
			GroupMemebers,
			createdBy,
		});

		return res.status(200).json(PostUser);
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});
router.delete("/groups/:id", async (req, res) => {
	try {
		const removeChats = await Group.findByIdAndRemove(req.params.id, req.body);
		return res.status(200).json(removeChats);
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});

module.exports = router;
