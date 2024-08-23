const express = require("express");
const zod = require("zod");
const { user: User } = require("../database/schema");
const { authMiddleware: auth } = require("../Middlewares/auth");
const userRouter = express.Router();

userRouter.put("/update", auth, async (req, res) => {
  const body = req.body;
  console.log(body, req.email);

  const updateBody = zod.object({
    password: zod.string().optional(),
    fName: zod.string().optional(),
    lName: zod.string().optional(),
  });

  const { success } = updateBody.safeParse(body);

  if (!success) {
    res.json({
      msg: "Incorrect Inputs",
    });
  }

  try {
    await User.updateOne({ email: req.user.email }, body);
    res.json({
      msg: "User Updated Successfully",
    });
  } catch (e) {
    res.status(403).json({
      msg: "Internal Error Occured",
    });
  }
});

userRouter.get("/info", auth, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });
    res.json({
      user,
    });
  } catch (e) {
    res.status(403).json({
      msg: "Internal Error Occured",
    });
    console.log(e.msg);
  }
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        fName: {
          $regex: filter,
        },
      },
      {
        lName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    users: users.map((user) => ({
      email: user.email,
      fName: user.fName,
      lName: user.lName,
      _id: user._id,
    })),
  });
});

module.exports = userRouter;
