const express = require("express");
const mongoose = require("mongoose");
const port = 9090;
const cors = require("cors");
const path = require("path");

const url_online =
	"mongodb+srv://giddy:EgFNt3LRl9olFnbn@cluster0.7rupp.mongodb.net/messangerAppDB?retryWrites=true&w=majority";

const app = express();
app.use(cors());
app.use(express.json());

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
	// console.log("connection is okay", socket.id);
});

mongoose
	.connect(url_online)
	.then(() => {
		console.log("connected to database");
	})
	.catch((err) => {
		console.log("an error occured");
	});

const db = mongoose.connection;

db.on("open", () => {
	const dbConnect = db.collection("chats").watch();

	dbConnect.on("change", (change) => {
		console.log(change);
		if (change.operationType === "insert") {
			const file = {
				_id: change.fullDocument._id,
				chats: change.fullDocument.chats,
				senderID: change.fullDocument.senderID,
				SendTo: change.fullDocument.SendTo,
			};
			io.emit("observer", file);
		} else if (change.operationType === "delete") {
			io.emit("observerDelete", change);
		}
	});
});
app.use("/", require("./AllRoute/UserRoute"));
app.use("/", require("./AllRoute/FriendRoute"));
app.use("/", require("./AllRoute/ChatRoute"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.listen(port, () => {
	console.log("listening on port");
});
