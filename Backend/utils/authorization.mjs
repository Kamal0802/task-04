import jwt from "jsonwebtoken";

const authMiddleWare = function (req, res, next) {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default authMiddleWare;
