import prisma from "../helpers/prisma.js";
import { MatchPassword } from "../helpers/verifiedPass.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
};
export default class AuthService {
  async login(email, password) {
    const requireField = ["email", "password"];
    requireField.forEach((item) => {
      if (!eval(item)) {
        return new Error(`${item} is required`);
      }
    });
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        return new Error(`${email} not found`);
      }
      const compare = await MatchPassword(password, user["password"]);
      if (!compare) {
        return new Error(`invalid credentials`);
      }
      delete user["password"];
      const token = createToken(user["id"] || null);
      const decodedToken = jwt.decode(token);
      const expiresIn = decodedToken ? decodedToken.exp : null;
      return { user, token, expiresIn };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
