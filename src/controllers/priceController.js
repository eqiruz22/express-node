import PriceService from "../services/priceService.js";
import { ResponseJson } from "../helpers/response.js";

const pricelist = new PriceService();

export const GetAllPrice = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const search = req.query.search || "";
  try {
    const data = await pricelist.getAll(page, size, search);
    return ResponseJson(res, 200, "show all price", data);
  } catch (error) {
    console.log(error);
    return ResponseJson(res, 500, "Internal server error", error);
  }
};

export const GetPriceById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await pricelist.getId(id);
    if (data instanceof Error) {
      if (data.message.includes("not found")) {
        return ResponseJson(res, 404, "not found", data.message);
      }
      if (data.message.includes("valid integer")) {
        return ResponseJson(res, 400, "request is not valid", data.message);
      }
    }
    return ResponseJson(res, 200, "show by id", data);
  } catch (error) {
    console.log(error);
    return ResponseJson(res, 500, "Internal server error", error);
  }
};

export const CreatePriceList = async (req, res) => {
  const { code, price, vmid, vyid } = req.body;
  try {
    const data = await pricelist.create(code, price, vmid, vyid);
    if (data instanceof Error) {
      if (
        data.message.includes("is required") ||
        data.message.includes("valid integer")
      ) {
        return ResponseJson(res, 400, "request is not valid", data.message);
      }
    }
    return ResponseJson(res, 201, "Created", data);
  } catch (error) {
    return ResponseJson(res, 500, "Internal server error", error);
  }
};

export const UpdatePriceList = async (req, res) => {
  const { id } = req.params;
  const { code, price, vmid, vyid } = req.body;
  try {
    const data = await pricelist.update(id, code, price, vmid, vyid);
    if (data instanceof Error) {
      if (
        data.message.includes("is required") ||
        data.message.includes("valid integer")
      ) {
        return ResponseJson(res, 400, "request is not valid", data.message);
      }
      if (data.message.includes("not found")) {
        return ResponseJson(res, 404, "not found", data.message);
      }
    }
    return ResponseJson(res, 200, "Updated", data);
  } catch (error) {
    return ResponseJson(res, 500, "Internal server error", error);
  }
};

export const DeletePriceList = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await pricelist.destroy(id);
    if (data instanceof Error) {
      if (data.message.includes("valid integer")) {
        return ResponseJson(res, 400, "request is not valid", data.message);
      }
      if (data.message.includes("not found")) {
        return ResponseJson(res, 404, "not found", data.message);
      }
    }
    return ResponseJson(res, 200, "Updated", data);
  } catch (error) {
    return ResponseJson(res, 500, "Internal server error", error);
  }
};
