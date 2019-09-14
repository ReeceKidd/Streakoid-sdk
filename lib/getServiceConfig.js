"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.getServiceConfig = function(environment) {
  if (environment === void 0) {
    environment = process.env;
  }
  var NODE_ENV = environment.NODE_ENV,
    APPLICATION_URL = environment.APPLICATION_URL;
  if (!NODE_ENV) throw new Error("NODE_ENV is not provided.");
  if (!APPLICATION_URL) {
    throw new Error("APPLICATION_URL is not provided.");
  }
  return {
    NODE_ENV: NODE_ENV,
    APPLICATION_URL: APPLICATION_URL
  };
};
//# sourceMappingURL=getServiceConfig.js.map
