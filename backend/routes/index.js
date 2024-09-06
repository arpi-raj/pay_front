const express = require("express");
const { sendOTP, generateOTP } = require("../Middlewares/otp");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const { user: User, account: Account } = require("../database/schema");
const { authMiddleware: auth } = require("../Middlewares/auth");
const zod = require("zod");
const userRouter = require("./userRouter");
const router = express.Router();
const { accountRouter } = require("./accountRouter");

router.use("/user", userRouter);
router.use("/account", accountRouter);

const signupSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
  fName: zod.string(),
  lName: zod.string(),
});

const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);
    if (!success) {
      res.json({
        msg: "incorrect inputs or email already taken",
      });
    }
    const user = await User.findOne({
      email: body.email,
    });

    if (user) {
      res.status(403).json({
        msg: "email already taken",
      });
      return;
    }

    const payload = {
      email: body.email,
      fName: body.fName,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    const ser = await User.create(body);
    console.log(ser);

    await Account.create({ userId: ser._id, balance: Math.random() * 10000 });

    res.json({
      msg: "user created successfully",
      token: token,
    });
  } catch (e) {
    res.status(403).json({
      msg: "Internal Error Occured",
    });
    console.log(e, msg);
  }
});
module.exports = router;

router.post("/signin", async (req, res) => {
  try {
    const body = req.body;

    console.log(JWT_SECRET);

    const { success } = signinSchema.safeParse(body);
    if (!success) {
      res.json({
        msg: "incorrect inputs",
      });
      return;
    }

    const user = await User.findOne({
      email: body.email,
    });

    if (!user) {
      res.status(403).json({
        msg: "User not found in Database, Please Sign Up first",
      });
      return;
    }

    if (user.password != body.password) {
      res.status(403).json({
        msg: "Invalid Password",
      });
      return;
    }

    const payload = {
      email: body.email,
      fName: user.fName,
    };

    console.log(JWT_SECRET);

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    console.log(token);

    res.json({
      token: token,
    });
  } catch (e) {
    console.log(e.msg);
    res.json({
      msg: "Internal Error Occured",
    });
  }
});

var generatedOtp;

router.post("/sendOtp", (req, res) => {
  try {
    const email = req.body.email;
    generatedOtp = generateOTP();
    console.log(generatedOtp);
    sendOTP(email, generatedOtp);

    res.status(200).json({
      msg: "Otp Sent Successfully",
    });
  } catch (e) {
    res.status(404).json({
      msg: "Error Sending Otp",
    });
    console.log(e.message);
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { email, otp, pass } = req.body;

    if (!pass || pass === "") {
      res.status(404).json({
        msg: "Password not Valid",
      });
    }

    // Ensure `generatedOtp` is fetched from where it was stored after being generated
    if (otp != generatedOtp) {
      res.status(404).json({
        msg: "Otp verification failed. Try Again",
      });
      console.log("Generated OTP: " + generatedOtp);
      console.log("Entered OTP: " + otp);
    } else {
      // Assuming you are storing password as plain text here, ensure it's hashed in real applications.
      await User.updateOne({ email }, { $set: { password: pass } });
      res.status(200).json({
        msg: "Password Changed Successfully",
      });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
    console.log(e.message);
  }
});

async function transfer(req) {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  // Fetch the accounts within the transaction
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    console.log("Insufficient balance");
    return;
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    console.log("Invalid account");
    return;
  }

  // Perform the transfer
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction();
  console.log("done");
}

module.exports = router;
