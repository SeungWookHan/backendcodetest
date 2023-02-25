import express, { Request, Response, NextFunction, Application } from "express";

import routes from "api";
import config from "config";

export default ({ app }: { app: Application }) => {
  /**
   * Health Check endpoints
   */
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  /**
   * Global middleware
   */
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Load API routes
  app.use(config.api.prefix, routes());

  // TODO: API Documentation

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
