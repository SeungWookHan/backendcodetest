import { Router } from "express";
import busRoute from "./routes/bus";

export default () => {
  const router: Router = Router();
  router.use("/buses", busRoute);
  // other routes

  return router;
};
