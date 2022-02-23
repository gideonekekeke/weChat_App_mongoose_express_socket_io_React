const friends = require("../Model/FriendsModel");

const express = require("express");
const router = express.Router();

router.get("/friends", async (req, res) => {
	try {
		const getUser = await friends.find();

		res.status(200).json(getUser);
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});

router.post("/friends", async (req, res) => {
	const { FriendName, FriendImage, userId, Ids } = req.body;
	try {
		const PostUser = await friends.create({
			FriendName,
			FriendImage,
			userId,
			Ids,
		});

		return res.status(200).json(PostUser);
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});

module.exports = router;
