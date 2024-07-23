import { ResponseJson } from "../helpers/response.js";

const meth = ["PATCH", "POST", "PUT", "DELETE"];
export const isAdmin = (req, res, next) => {
  if (req.user.is_admin === true) {
    next();
  } else if (req.user.is_admin === false && meth.includes(req.method)) {
    return ResponseJson(res, 403, "Method not allowed", null);
  } else {
    return ResponseJson(res, 403, "Forbidden Access", null);
  }
};
