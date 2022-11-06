"use strict";
exports.__esModule = true;
var config = {
    apiKey: process.env.COVALENT_API_KEY,
    apiHost: "https://api.covalenthq.com",
    concurrency: 10,
    retries: 3,
    timeout: 30000
};
exports["default"] = config;
