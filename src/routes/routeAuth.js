import express from "express";
import { Login } from "../controllers/authController.js";

const route = express.Router();

route.post("/auth", Login);

export default route;
