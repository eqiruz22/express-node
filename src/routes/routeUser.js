import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserId,
  updateUser,
} from "../controllers/userController.js";

const route = express.Router();

route.get("/user", getAllUser);
route.get("/user/:id", getUserId);
route.post("/user", createUser);
route.patch("/user/:id", updateUser);
route.delete("/user/:id", deleteUser);

export default route;
