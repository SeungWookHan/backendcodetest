import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  port: process.env.PORT || 80,
  accessKey: process.env.ACCESS_KEY, // Bus api access key
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  /**
   * API configs
   */
  api: {
    prefix: "/v1",
  },
};
