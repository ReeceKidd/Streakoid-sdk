"use strict";
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
var getServiceConfig_1 = require("./getServiceConfig");
describe("getServiceConfig", function() {
  var environmentMock = {
    NODE_ENV: "NODE_ENV",
    APPLICATION_URL: "APPLICATION_URL"
  };
  test("that correct error is thrown when NODE_ENV is not provided", function() {
    expect.assertions(1);
    var environment = __assign(__assign({}, environmentMock), {
      NODE_ENV: undefined
    });
    try {
      getServiceConfig_1.getServiceConfig(environment);
    } catch (err) {
      expect(err.message).toEqual("NODE_ENV is not provided.");
    }
  });
  test("that correct error is thrown when APPLICATION_URL is not provided.", function() {
    expect.assertions(1);
    var environment = __assign(__assign({}, environmentMock), {
      APPLICATION_URL: undefined
    });
    try {
      getServiceConfig_1.getServiceConfig(environment);
    } catch (err) {
      expect(err.message).toEqual("APPLICATION_URL is not provided.");
    }
  });
});
//# sourceMappingURL=getServiceConfig.spec.js.map
