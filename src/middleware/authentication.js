import prisma from "../helpers/prisma.js";
import jwt from "jsonwebtoken";
import { ResponseJson } from "../helpers/response.js";

const RequireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return ResponseJson(res, 401, "Authorization token is required", null);
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      return ResponseJson(res, 404, "not found", null);
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return ResponseJson(res, 401, "Invalid token", null);
    } else if (error.name === "TokenExpiredError") {
      return ResponseJson(res, 401, "Token expired", null);
    } else {
      console.error(error);
      return ResponseJson(res, 500, "Internal server error", null);
    }
  }
};

export default RequireAuth;
