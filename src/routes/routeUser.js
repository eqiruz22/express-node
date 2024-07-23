import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserId,
  updateUser,
} from "../controllers/userController.js";
import { isAdmin } from "../middleware/authorization.js";

const route = express.Router();

route.get("/user", getAllUser);
route.get("/user/:id", isAdmin, getUserId);
route.post("/user", isAdmin, createUser);
route.patch("/user/:id", isAdmin, updateUser);
route.delete("/user/:id", isAdmin, deleteUser);

export default route;
