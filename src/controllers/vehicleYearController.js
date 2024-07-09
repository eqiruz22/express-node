import { ResponseJson } from "../helpers/response.js";
import YearService from "../services/yearService.js";

const ys = new YearService();
export const GetAllYear = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.size) || 10;
    const search = req.query.query || "";
    const data = await ys.getAll(page, pageSize, search);
    return ResponseJson(res, 200, "show all data user", data);
  } catch (error) {
    return ResponseJson(res, 500, "Internal server error", error);
  }
};

export const GetId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ys.getId(id);
    return ResponseJson(res, 200, "show user by id", data);
  } catch (error) {
    if (error.message.includes("not found")) {
      return ResponseJson(res, 404, "not found", error.message);
    }
    if (error.message.includes("valid integer")) {
      return ResponseJson(res, 400, "request is not valid", error.message);
    }
    return ResponseJson(res, 500, "Internal server error", error);
  }
};

export const CreateYear = async (req, res) => {
  const { year } = req.body;
  try {
    const data = await ys.create(year);
    return ResponseJson(res, 200, "Created", data);
  } catch (error) {
    if (error.message.includes("is required")) {
      return ResponseJson(res, 400, "request is not valid", error.message);
    }
    return ResponseJson(res, 500, "Internal server error", error);
  }
};

export const UpdateYear = async (req, res) => {
  const { id } = req.params;
  const { year } = req.body;
  try {
    const data = await ys.update(id, year);
    return ResponseJson(res, 200, "Updated", data);
  } catch (error) {
    if (error.message.includes("not found")) {
      return ResponseJson(res, 404, "not found", error.message);
    }
    if (
      error.message.includes("valid integer") ||
      error.message.includes("is required")
    ) {
      return ResponseJson(res, 400, "request is not valid", error.message);
    }
    return ResponseJson(res, 500, "Internal server error", error);
  }
};

export const DeleteYear = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ys.destroy(id);
    return ResponseJson(res, 200, "Deleted", data);
  } catch (error) {
    if (error.message.includes("not found")) {
      return ResponseJson(res, 404, "not found", error.message);
    }
    if (error.message.includes("valid integer")) {
      return ResponseJson(res, 400, "request is not valid", error.message);
    }
    return ResponseJson(res, 500, "Internal server error", error);
  }
};
