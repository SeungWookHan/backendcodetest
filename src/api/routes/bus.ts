import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { Logger } from "winston";
import BusService from "services/bus";

/**
 * @route /buses
 */
const route: Router = Router();

route.get("/test", async (req: Request, res: Response) => {
  return res.status(200).send("This is test response");
});

route.get("", async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = Container.get("logger");
  logger.debug("Calling /buses endpoint to get busInfo");
  try {
    const busService = Container.get(BusService);
    const routes = await busService.getRandomRoutes();
    const busStops = await busService.getBusStops(
      routes.map((r) => r.busRouteId)
    );
    const busArrivals = await busService.getFastestBusArrivals(busStops);
    return res.status(200).json(busArrivals);
  } catch (e) {
    logger.error("🔥 Fail to get busInfo: %o", e);
    return next(e);
  }
});

export default route;
