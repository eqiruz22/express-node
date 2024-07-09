import { ResponseJson } from "../helpers/response.js";
import { VehicleBrandService } from "../services/vehicleBrandService.js";

const vehicle = new VehicleBrandService();

export const GetAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const search = req.query.search || "";
  try {
    const data = await vehicle.getAll(page, size, search);
    return ResponseJson(res, 200, "show all data", data);
  } catch (error) {
    return ResponseJson(res, 500, "Internal server error", error);
  }
};

export const GetId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await vehicle.getId(id);
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

export const CreateVBrand = async (req, res) => {
  const { name } = req.body;
  try {
    const data = await vehicle.create(name);
    return ResponseJson(res, 201, "Created", data);
  } catch (error) {
    if (error.message.includes("is required")) {
      return ResponseJson(res, 404, "request is not valid", error.message);
    }
    return ResponseJson(res, 500, "Internal server error", error);
  }
};

export const UpdateVBrand = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const data = await vehicle.update(id, name);
    return ResponseJson(res, 200, "updated", data);
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

export const DeleteVBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await vehicle.destroy(id);
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
