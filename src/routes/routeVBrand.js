import express from "express";
import {
  CreateVBrand,
  DeleteVBrand,
  GetAll,
  GetId,
  UpdateVBrand,
} from "../controllers/vehicleBrandController.js";

const route = express.Router();

route.get("/vehicle-brand", GetAll);
route.get("/vehicle-brand/:id", GetId);
route.post("/vehicle-brand", CreateVBrand);
route.patch("/vehicle-brand/:id", UpdateVBrand);
route.delete("/vehicle-brand/:id", DeleteVBrand);

export default route;
