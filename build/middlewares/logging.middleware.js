"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../shared/logger"));
var loggingMiddleware = function () {
    return function (req, res, next) {
        logger_1.default.info("Request : " + req.method + " " + req.path);
        next();
    };
};
exports.default = loggingMiddleware;
