const mongoose = require("mongoose");
require("dotenv").config();
//Set up default mongoose connection
const mongoDB = process.env.mongoUrl;
mongoose.connect(mongoDB);
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully");
});

const userSchema = new mongoose.Schema({
  userName: String,
  email: { type: String, required: true, unique: true },
  password: String,
  fName: String,
  lName: String,
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to User model
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
const user = mongoose.model("user", userSchema);
const account = mongoose.model("account", accountSchema);

module.exports = { user, account };
