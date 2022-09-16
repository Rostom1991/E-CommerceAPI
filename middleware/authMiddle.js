const jwt = require("jsonwebtoken");

const authMiddle = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    if (verified) {
      req.user = verified;
      return next();
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

module.exports = authMiddle;
