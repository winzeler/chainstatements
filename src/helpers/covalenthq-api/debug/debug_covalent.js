"use strict";
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
var dotenv = require("dotenv");
dotenv.config();
var CovalentHQ = require("../src/");
var bignumber_js_1 = require("bignumber.js");
var web_api_1 = require("@hybiscus/web-api");
var Core = web_api_1.Components.Core;
var Section = Core.Section, Table = Core.Table, Row = Core.Row;
var reportSchema = {
    "type": "Report",
    "options": {
        "report_title": "0xplaceholder",
        "report_byline": "Monthly Wallet Statement",
        "version_number": "v0.1 ChainStatements.com"
    },
    "config": {
        "colour_theme": "summer",
        "typography_theme": "jost"
    },
    "components": [
        {
            "type": "Section",
            "options": {
                "section_title": "ENS:  placeholder.eth",
                "highlighted": true,
                "columns": 3
            },
            "components": [
                {
                    "type": "Card",
                    "options": {
                        "title": "Chain",
                        "value": "Ethereum"
                    }
                },
                {
                    "type": "Card",
                    "options": {
                        "title": "Total Balance",
                        "value": "11,983",
                        "units": "$"
                    }
                },
                {
                    "type": "Card",
                    "options": {
                        "title": "Last Month",
                        "value": "10,420",
                        "units": "$"
                    }
                },
                {
                    "type": "Card",
                    "options": {
                        "title": "Fiat Currency",
                        "value": "USD",
                        "icon": "coin"
                    }
                },
                {
                    "type": "Card",
                    "options": {
                        "title": "Number of Tokens",
                        "value": "116",
                        "icon": "comet"
                    }
                },
                {
                    "type": "Card",
                    "options": {
                        "title": "Percent Change",
                        "value": "0.15",
                        "units": "%",
                        "icon": "chart-area-line"
                    }
                }
            ]
        },
        {
            "type": "Section",
            "options": {
                "section_title": "Top Tokens"
            },
            "components": [
                {
                    "type": "Row",
                    "options": {
                        "columns": 2
                    },
                    "components": [
                        {
                            "type": "DoughnutRing",
                            "options": {
                                "width": "1/2",
                                "data": [{ "end": 55 }, { "end": 78 }],
                                "chart_title": "By Price",
                                "inside_title": "Usage",
                                "inside_subtitle": "(hours)"
                            }
                        },
                        {
                            "type": "DoughnutRing",
                            "options": {
                                "width": "1/2",
                                "data": [{ "end": 55 }, { "end": 78 }],
                                "chart_title": "By Quantity",
                                "inside_title": "Usage",
                                "inside_subtitle": "(hours)"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "Section",
            "options": {
                "section_title": "Best Performing Tokens"
            },
            "components": [
                {
                    "type": "Table",
                    "options": {
                        "title": "",
                        "headings": [
                            "Name",
                            "Symbol",
                            "Price",
                            "Quantity",
                            "Balance"
                        ],
                        "striped": true,
                        "rows": [
                            [
                                "Ethereum",
                                "ETH",
                                "$1,550.00",
                                "0.580",
                                "$940.00"
                            ],
                            [
                                "Ethereum",
                                "ETH",
                                "$1,550.00",
                                "0.580",
                                "$940.00"
                            ],
                            [
                                "Ethereum",
                                "ETH",
                                "$1,550.00",
                                "0.580",
                                "$940.00"
                            ],
                            [
                                "Ethereum",
                                "ETH",
                                "$1,550.00",
                                "0.580",
                                "$940.00"
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "type": "Section",
            "options": {
                "section_title": "Worst Performing Tokens",
                "highlighted": true
            },
            "components": [
                {
                    "type": "Table",
                    "options": {
                        "title": "",
                        "headings": [
                            "Name",
                            "Symbol",
                            "Price",
                            "Quantity",
                            "Balance"
                        ],
                        "striped": true,
                        "rows": [
                            [
                                "Ethereum",
                                "ETH",
                                "$1,550.00",
                                "0.580",
                                "$940.00"
                            ],
                            [
                                "Ethereum",
                                "ETH",
                                "$1,550.00",
                                "0.580",
                                "$940.00"
                            ],
                            [
                                "Ethereum",
                                "ETH",
                                "$1,550.00",
                                "0.580",
                                "$940.00"
                            ],
                            [
                                "Ethereum",
                                "ETH",
                                "$1,550.00",
                                "0.580",
                                "$940.00"
                            ]
                        ]
                    }
                }
            ]
        }
    ]
};
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var address, covalentHQ, balances, client, response, error_1, itemArr, i, itm, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                address = "0xfc43f5f9dd45258b3aff31bdbe6561d97e8b71de";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                covalentHQ = CovalentHQ.createAPI(process.env.COVALENT_API_KEY ? process.env.COVALENT_API_KEY : "");
                return [4 /*yield*/, covalentHQ.getTokenBalancesForAddress(address, 1)];
            case 2:
                balances = _a.sent();
                client = new web_api_1.HybiscusClient(process.env.PDF_KEY ? process.env.PDF_KEY : "");
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, client.buildReport({ report: null, reportSchema: reportSchema })];
            case 4:
                response = _a.sent();
                console.log(response);
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 6];
            case 6:
                reportSchema.options.report_title = balances['data']['address'];
                reportSchema.components[0].options.section_title = "ENS:  demo.eth";
                //reportSchema.components[0].components[3].options.value = balances['data']?.quote_currency;
                console.log(balances['data']['address']);
                console.log(balances['data']['chain_id']);
                console.log(balances['data']['updated_at']);
                console.log(balances['data']['next_update_at']);
                console.log(balances['data']['quote_currency']);
                itemArr = balances['data']['items'];
                for (i = 0; i < itemArr.length; i++) {
                    itemArr[i].balance_dec = new bignumber_js_1["default"](itemArr[i].balance).shiftedBy(-itemArr[i].contract_decimals).toString();
                    itemArr[i].balance_24h_dec = new bignumber_js_1["default"](itemArr[i].balance_24h).shiftedBy(-itemArr[i].contract_decimals).toString();
                    itm = itemArr[i];
                    console.log(itm);
                }
                return [3 /*break*/, 8];
            case 7:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); })();
