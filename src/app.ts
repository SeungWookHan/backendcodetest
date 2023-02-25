// Required for decorators
import "reflect-metadata";

import express from "express";
import config from "./config";
import Logger from "./loaders/logger";

async function startServer() {
  const app = express();

  await require("./loaders").default({ expressApp: app });

  // Start server application
  app.listen(config.port, () => {
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
  });
}

try {
  startServer();
} catch (err) {
  Logger.error(err);
  process.exit(1);
}
