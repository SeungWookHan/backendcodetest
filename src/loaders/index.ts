import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import Logger from "./logger";

export default async ({ expressApp }) => {
  dependencyInjectorLoader();
  Logger.info("✌️ Dependency Injector loaded");

  expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
