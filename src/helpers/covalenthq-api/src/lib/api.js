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
exports.__esModule = true;
exports.createAPI = void 0;
var axios_1 = require("axios");
var config_1 = require("./config");
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var CovalentHQAPI = /** @class */ (function () {
    function CovalentHQAPI(apiKey, options) {
        this.options = {
            endPoint: config_1["default"].apiHost,
            floodControl: true,
            debugMode: false,
            parallelRequests: 1
        };
        this.lastRequestDate = new Date('1970-01-01');
        this.apiKey = apiKey;
        this.options = __assign(__assign({}, this.options), options);
    }
    // NOTE: user tracks covalent pagination, could be improved with getPagination wrapper
    CovalentHQAPI.prototype.getTokenBalancesForAddress = function (address, chainId) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "".concat(this.options.endPoint, "/v1/").concat(chainId, "/address/").concat(address, "/balances_v2/?key=").concat(this.apiKey);
                return [2 /*return*/, this.get(url)];
            });
        });
    };
    CovalentHQAPI.prototype.getTransaction = function (hash, chainId) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "".concat(this.options.endPoint, "/v1/").concat(chainId, "/transaction_v2/").concat(hash, "/?key=").concat(this.apiKey);
                return [2 /*return*/, this.get(url)];
            });
        });
    };
    ;
    CovalentHQAPI.prototype.getTransactions = function (address, chainId, pagination) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "".concat(this.options.endPoint, "/v1/").concat(chainId, "/address/").concat(address, "/transactions_v2/?key=").concat(this.apiKey);
                return [2 /*return*/, this.get(url, pagination)];
            });
        });
    };
    CovalentHQAPI.prototype.getHistoricalPortfolioValue = function (address, chainId, pagination) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "".concat(this.options.endPoint, "/v1/").concat(chainId, "/address/").concat(address, "/portfolio_v2/?key=").concat(this.apiKey);
                return [2 /*return*/, this.get(url, pagination)];
            });
        });
    };
    CovalentHQAPI.prototype.getTokenMetadata = function (chainId, contractAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "".concat(this.options.endPoint, "/v1/").concat(chainId, "/tokens/").concat(contractAddress, "/?key=").concat(this.apiKey);
                return [2 /*return*/, this.get(url)];
            });
        });
    };
    CovalentHQAPI.prototype.getBlockTransactionWithContractTransfers = function (chainId, blockHeight) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "".concat(this.options.endPoint, "/v1/").concat(chainId, "/block_v2/").concat(blockHeight, "/?key=").concat(this.apiKey);
                return [2 /*return*/, this.get(url)];
            });
        });
    };
    CovalentHQAPI.prototype.getBlockTransactionWithLogEvents = function (chainId, blockHeight) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "".concat(this.options.endPoint, "/v1/").concat(chainId, "/block_v2/").concat(blockHeight, "/?key=").concat(this.apiKey);
                return [2 /*return*/, this.get(url)];
            });
        });
    };
    CovalentHQAPI.prototype.getMethodCallsForTransfers = function (chainId, contractAddress, methodSignature, pagination) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "".concat(this.options.endPoint, "/v1/").concat(chainId, "/address/").concat(contractAddress, "/transfers_v2/?key=").concat(this.apiKey);
                return [2 /*return*/, this.get(url, pagination)];
            });
        });
    };
    CovalentHQAPI.prototype.getTokenTransfers = function (chainId, contractAddress, pagination) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "".concat(this.options.endPoint, "/v1/").concat(chainId, "/address/").concat(contractAddress, "/transfers_v2/?key=").concat(this.apiKey);
                return [2 /*return*/, this.get(url, pagination)];
            });
        });
    };
    CovalentHQAPI.prototype.getLogEvents = function (chainId, contractAddress, pagination) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "".concat(this.options.endPoint, "/v1/").concat(chainId, "/address/").concat(contractAddress, "/events_v2/?key=").concat(this.apiKey);
                return [2 /*return*/, this.get(url, pagination)];
            });
        });
    };
    // flood control get and axios-concurrency inspired by simplehash-api module
    CovalentHQAPI.prototype.get = function (url, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, json, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitForFloodControl()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios_1["default"].get(url, {
                                params: params,
                                headers: {
                                    Accept: 'application/json'
                                }
                            })];
                    case 3:
                        response = _a.sent();
                        json = response.data;
                        return [2 /*return*/, json];
                    case 4:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, {}];
                }
            });
        });
    };
    CovalentHQAPI.prototype.waitForFloodControl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var now, diff;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.options.floodControl) return [3 /*break*/, 2];
                        now = new Date();
                        diff = now.getTime() - this.lastRequestDate.getTime();
                        if (!(diff < 100)) return [3 /*break*/, 2];
                        return [4 /*yield*/, sleep(100)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.lastRequestDate = new Date();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CovalentHQAPI;
}());
function createAPI(apiKey, options) {
    return new CovalentHQAPI(apiKey, options);
}
exports.createAPI = createAPI;
