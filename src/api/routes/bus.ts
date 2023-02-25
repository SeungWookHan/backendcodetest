import { Router, Request, Response } from "express";

/**
 * @route /buses
 */
const route: Router = Router();

route.get("/test", async (req: Request, res: Response) => {
  return res.status(200).send("This is test response");
});

export default route;
