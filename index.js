import express from "express";
import UserRoute from "./src/routes/routeUser.js";
import RouteVBrand from "./src/routes/routeVBrand.js";
import RouteVType from "./src/routes/routeVType.js";
import RouteVModel from "./src/routes/routeVModel.js";
import RouteYear from "./src/routes/routeYear.js";
import RoutePrice from "./src/routes/routePrice.js";
import RouteAuth from "./src/routes/routeAuth.js";
import cors from "cors";
import RequireAuth from "./src/middleware/authentication.js";
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(RouteAuth);
app.use(RequireAuth);
app.use(UserRoute);
app.use(RouteVBrand);
app.use(RouteVType);
app.use(RouteVModel);
app.use(RouteYear);
app.use(RoutePrice);

app.get("*", (req, res) => {
  return res.status(404).json({
    statusCode: 404,
    message: "Not Found",
    result: `pathname ${req.originalUrl} not found`,
  });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
