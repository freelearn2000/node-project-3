"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_mung_1 = __importDefault(require("express-mung"));
var xml2js_1 = __importDefault(require("xml2js"));
var responseMiddleware = function () {
    return express_mung_1.default.json(function (body, req, res) {
        var accept = req.header("Accept");
        if (accept === "application/xml") {
            // Convert to xml
            var builder = new xml2js_1.default.Builder({ rootName: "xml" });
            body = builder.buildObject(body);
        }
        return body;
    });
};
exports.default = responseMiddleware;
