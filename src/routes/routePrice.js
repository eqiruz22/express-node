import express from "express";
import {
  CreatePriceList,
  DeletePriceList,
  GetAllPrice,
  GetPriceById,
  UpdatePriceList,
} from "../controllers/priceController.js";

const route = express.Router();

route.get("/price", GetAllPrice);
route.get("/price/:id", GetPriceById);
route.post("/price", CreatePriceList);
route.patch("/price", UpdatePriceList);
route.delete("/price", DeletePriceList);

export default route;
