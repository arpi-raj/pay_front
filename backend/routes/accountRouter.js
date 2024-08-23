const express = require("express");
const mongoose = require("mongoose");
const { account: Account, user: User } = require("../database/schema");
const { authMiddleware: auth } = require("../Middlewares/auth");
const accountRouter = express.Router();

accountRouter.get("/balance", auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const account = await Account.findOne({ userId: user._id });
    if (!account) {
      return res.status(404).json({ msg: "Account not found" });
    }

    res.json({ balance: account.balance });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

accountRouter.post("/transfer", auth, async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const { amount, to } = req.body;

    if (amount <= 0) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid transfer amount" });
    }

    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user._id;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: userId }).session(session);
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid recipient account" });
    }

    // Perform the transfer
    await Account.updateOne(
      { userId: userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({ message: "Transfer successful" });
  } catch (error) {
    console.error(error.message);
    await session.abortTransaction();
    res.status(500).json({ message: "Server error" });
  } finally {
    session.endSession();
  }
});

module.exports = {
  accountRouter,
};
