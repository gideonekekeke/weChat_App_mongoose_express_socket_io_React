const userModel = require("../Model/UserModel");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
		);
	},
});

const upload = multer({ storage: storage }).single("image");

router.get("/user", async (req, res) => {
	try {
		const getUsers = await userModel.find();

		res.status(200).json({
			message: "successful",
			data: getUsers,
		});
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});
router.get("/user/:id", async (req, res) => {
	try {
		const getUsers = await userModel.findById(req.params.id, req.body);

		res.status(200).json({
			message: "successful",
			data: getUsers,
		});
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});

router.post("/register", upload, async (req, res) => {
	const { fullName, email, password } = req.body;
	try {
		const salt = await bcrypt.genSalt(10);

		const hashPassword = await bcrypt.hash(password, salt);

		const RegisterUser = await userModel.create({
			fullName,
			email,
			password: hashPassword,
			image: req.file.path,
		});
		res.status(200).json({
			message: "successful",
			data: RegisterUser,
		});
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});

router.post("/siginin", async (req, res) => {
	try {
		const { email } = req.body;

		const user = await userModel.findOne({ email });

		if (user) {
			const checkPassword = await bcrypt.compare(
				req.body.password,
				user.password,
			);

			if (checkPassword) {
				const { password, ...info } = user._doc;

				const token = jwt.sign(
					{
						id: user._id,
						fullName: user.fullName,
						email: user.email,
					},
					"ThisSEcrETeKey",
					{ expiresIn: "1d" },
				);

				res.status(200).json({
					data: { ...info, token },
				});
			} else {
				res.status(400).json({ message: "password is incorrect" });
			}
		} else {
			res.status(400).json({ message: "user not found" });
		}
	} catch (err) {
		res.status(400).json({ message: "an error occured" });
	}
});

module.exports = router;
