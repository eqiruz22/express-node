import express from "express";
import {
  CreateVehicleType,
  DeleteVehicleType,
  GetAll,
  GetId,
  UpdateVehicleType,
} from "../controllers/vehicleTypeController.js";

const route = express.Router();

route.get("/vehicle-type", GetAll);
route.get("/vehicle-type/:id", GetId);
route.post("/vehicle-type", CreateVehicleType);
route.patch("/vehicle-type/:id", UpdateVehicleType);
route.delete("/vehicle-type/:id", DeleteVehicleType);

export default route;
