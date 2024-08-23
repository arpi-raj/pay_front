const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (err) {
    return res.status(401).json({
      msg:"Invalid or Expired Token"
    });
  }
};

module.exports = {
  authMiddleware,
};
