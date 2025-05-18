import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authorization token missing or malformed",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;

    next();
  } catch (e) {
    console.error("Incorrect token");
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
}
