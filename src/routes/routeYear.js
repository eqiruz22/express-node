import express from "express";
import {
  CreateYear,
  DeleteYear,
  GetAllYear,
  GetId,
  UpdateYear,
} from "../controllers/vehicleYearController.js";

const route = express.Router();

route.get("/year", GetAllYear);
route.get("/year/:id", GetId);
route.post("/year", CreateYear);
route.patch("/year/:id", UpdateYear);
route.delete("/year/:id", DeleteYear);

export default route;
