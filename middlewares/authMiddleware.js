import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ error: "Auth Field" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.body.user = { userId: payload.userId };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Auth Failed" });
  }
};

export default userAuth;