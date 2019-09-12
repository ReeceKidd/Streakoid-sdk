"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var streakoid_1 = __importDefault(require("./streakoid"));
var getServiceConfig_1 = require("../getServiceConfig");
var APPLICATION_URL = getServiceConfig_1.getServiceConfig().APPLICATION_URL;
describe("SDK soloStreaks", function () {
    afterEach(function () {
        jest.resetAllMocks();
    });
    describe("getAll", function () {
        test("calls GET with correct URL when no query paramters are passed", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect.assertions(1);
                        axios_1.default.get = jest.fn();
                        return [4 /*yield*/, streakoid_1.default.soloStreaks.getAll({})];
                    case 1:
                        _a.sent();
                        expect(axios_1.default.get).toBeCalledWith(APPLICATION_URL + "/v1/solo-streaks?");
                        return [2 /*return*/];
                }
            });
        }); });
        test("calls GET with correct URL when userId query paramater is passed", function () { return __awaiter(void 0, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect.assertions(1);
                        axios_1.default.get = jest.fn();
                        userId = "userId";
                        return [4 /*yield*/, streakoid_1.default.soloStreaks.getAll({ userId: userId })];
                    case 1:
                        _a.sent();
                        expect(axios_1.default.get).toBeCalledWith(APPLICATION_URL + "/v1/solo-streaks?userId=" + userId + "&");
                        return [2 /*return*/];
                }
            });
        }); });
        test("calls GET with correct URL when completedToday query paramater is passed", function () { return __awaiter(void 0, void 0, void 0, function () {
            var completedToday;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect.assertions(1);
                        axios_1.default.get = jest.fn();
                        completedToday = true;
                        return [4 /*yield*/, streakoid_1.default.soloStreaks.getAll({ completedToday: completedToday })];
                    case 1:
                        _a.sent();
                        expect(axios_1.default.get).toBeCalledWith(APPLICATION_URL + "/v1/solo-streaks?completedToday=true&");
                        return [2 /*return*/];
                }
            });
        }); });
        test("calls GET with correct URL when timezone query paramater is passed", function () { return __awaiter(void 0, void 0, void 0, function () {
            var timezone;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect.assertions(1);
                        axios_1.default.get = jest.fn();
                        timezone = "Europe/London";
                        return [4 /*yield*/, streakoid_1.default.soloStreaks.getAll({ timezone: timezone })];
                    case 1:
                        _a.sent();
                        expect(axios_1.default.get).toBeCalledWith(APPLICATION_URL + "/v1/solo-streaks?timezone=" + timezone + "&");
                        return [2 /*return*/];
                }
            });
        }); });
        test("calls GET with correct URL when active query paramater is passed", function () { return __awaiter(void 0, void 0, void 0, function () {
            var active;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect.assertions(1);
                        axios_1.default.get = jest.fn();
                        active = true;
                        return [4 /*yield*/, streakoid_1.default.soloStreaks.getAll({ active: active })];
                    case 1:
                        _a.sent();
                        expect(axios_1.default.get).toBeCalledWith(APPLICATION_URL + "/v1/solo-streaks?active=" + active);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("getOne", function () {
        test("calls GET with correct URL", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect.assertions(1);
                        axios_1.default.get = jest.fn();
                        return [4 /*yield*/, streakoid_1.default.soloStreaks.getOne("id")];
                    case 1:
                        _a.sent();
                        expect(axios_1.default.get).toBeCalledWith(APPLICATION_URL + "/v1/solo-streaks/id");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("create", function () {
        test("calls POST with correct URL and data parmaters", function () { return __awaiter(void 0, void 0, void 0, function () {
            var userId, name, description, timezone;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect.assertions(1);
                        axios_1.default.post = jest.fn();
                        userId = "userId";
                        name = "name";
                        description = "descrption";
                        timezone = "timezone";
                        return [4 /*yield*/, streakoid_1.default.soloStreaks.create(userId, name, timezone, description)];
                    case 1:
                        _a.sent();
                        expect(axios_1.default.post).toBeCalledWith(APPLICATION_URL + "/v1/solo-streaks", {
                            userId: userId,
                            name: name,
                            description: description
                        }, {
                            headers: {
                                "x-timezone": timezone
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("update", function () {
        test("calls PATCH with correct URL and data parmaters", function () { return __awaiter(void 0, void 0, void 0, function () {
            var name, description, data, timezone;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect.assertions(1);
                        axios_1.default.patch = jest.fn();
                        name = "name";
                        description = "description";
                        data = {
                            name: name,
                            description: description,
                            activity: []
                        };
                        timezone = "timezone";
                        return [4 /*yield*/, streakoid_1.default.soloStreaks.update("id", timezone, data)];
                    case 1:
                        _a.sent();
                        expect(axios_1.default.patch).toBeCalledWith(APPLICATION_URL + "/v1/solo-streaks/id", __assign({}, data), {
                            headers: {
                                "x-timezone": timezone
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("deleteOne", function () {
        test("calls DELETE correct URL ", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect.assertions(1);
                        axios_1.default.delete = jest.fn();
                        return [4 /*yield*/, streakoid_1.default.soloStreaks.deleteOne("id")];
                    case 1:
                        _a.sent();
                        expect(axios_1.default.delete).toBeCalledWith(APPLICATION_URL + "/v1/solo-streaks/id");
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=soloStreaks.spec.js.map