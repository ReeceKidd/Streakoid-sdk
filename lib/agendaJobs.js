"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var ApiVersions_1 = __importDefault(require("./ApiVersions"));
var RouterCategories_1 = __importDefault(require("./RouterCategories"));
exports.default = function(applicationUrl) {
  var deleteOne = function(agendaJobId) {
    return axios_1.default.delete(
      applicationUrl +
        "/" +
        ApiVersions_1.default.v1 +
        "/" +
        RouterCategories_1.default.agendaJobs +
        "/" +
        agendaJobId
    );
  };
  return {
    deleteOne: deleteOne
  };
};
//# sourceMappingURL=agendaJobs.js.map
