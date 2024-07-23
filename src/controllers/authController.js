import { ResponseJson } from "../helpers/response.js";
import AuthService from "../services/authService.js";

const auth = new AuthService();
export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await auth.login(email, password);
    if (data instanceof Error) {
      if (data.message.includes("is required")) {
        return ResponseJson(res, 400, "request is not valid", data.message);
      }
      if (data.message.includes("not found")) {
        return ResponseJson(res, 404, "not found", data.message);
      }
      if (data.message.includes("invalid credentials")) {
        return ResponseJson(res, 403, "invalid authenthication", data.message);
      }
    }
    return ResponseJson(res, 200, "login success", data);
  } catch (error) {
    return ResponseJson(res, 500, "Internal server error", error);
  }
};
