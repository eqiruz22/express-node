import UserService from "../services/userService.js";
import { ResponseJson } from "../helpers/response.js";

const users = new UserService();
export const getAllUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.size) || 10;
    const search = req.query.search || "";
    const data = await users.getAll(page, pageSize, search);
    return ResponseJson(res, 200, "show all data user", data);
  } catch (error) {
    console.log(error);
    return ResponseJson(res, 500, "Internal server error", error);
  }
};

export const getUserId = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await users.getIdUser(id);
    return ResponseJson(res, 200, "show user by id", data);
  } catch (error) {
    console.log(error);
    if (error.message.includes("not found")) {
      return ResponseJson(res, 404, "not found", error.message);
    }
    if (error.message.includes("valid integer")) {
      return ResponseJson(res, 400, "request is not valid", error.message);
    }
    return ResponseJson(res, 500, "Internal server error", error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, is_admin } = req.body;
    const data = await users.createUser(name, email, password, is_admin);
    console.log(data);
    return ResponseJson(res, 201, "success create user", data);
  } catch (error) {
    if (
      error.message.includes("is required") ||
      error.message.includes("already registered")
    ) {
      return ResponseJson(res, 400, "request is not valid", error.message);
    }
    return ResponseJson(res, 500, "Internal server error", error);
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password, is_admin } = req.body;
  const { id } = req.params;
  try {
    const data = await users.update(id, name, email, password, is_admin);
    return ResponseJson(res, 200, "update success", data);
  } catch (error) {
    if (
      error.message.includes("is required") ||
      error.message.includes("valid integer")
    ) {
      return ResponseJson(res, 400, "request is not valid", error.message);
    }
    if (error.message.includes("not found")) {
      return ResponseJson(res, 404, "not found", error.message);
    }
    return ResponseJson(res, 500, "Internal server error", error);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await users.destroy(id);
    return ResponseJson(res, 200, "Deleted", data);
  } catch (error) {
    if (error.message.includes("valid integer")) {
      return ResponseJson(res, 400, "request is not valid", error.message);
    }
    if (error.message.includes("not found")) {
      return ResponseJson(res, 404, "not found", error.message);
    }
    return ResponseJson(res, 500, "Internal server error", error);
  }
};
