import express from "express";
import {
  CreateVehicleModel,
  DeleteVehicleModel,
  GetAll,
  GetId,
  UpdateVehicleModel,
} from "../controllers/vehicleModelController.js";

const route = express.Router();

route.get("/vehicle-model", GetAll);
route.get("/vehicle-model/:id", GetId);
route.get("/vehicle-model", CreateVehicleModel);
route.get("/vehicle-model", UpdateVehicleModel);
route.get("/vehicle-model", DeleteVehicleModel);

export default route;
