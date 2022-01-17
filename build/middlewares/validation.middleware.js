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
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var common_1 = require("../shared/common");
var valMiddleware = function (validator, options) {
    if (options === void 0) { options = {}; }
    return function (req, res, next) {
        (0, class_validator_1.validate)((0, class_transformer_1.plainToClass)(validator, req.body), __assign(__assign({}, options), { forbidNonWhitelisted: true, whitelist: true }))
            .then(function (errors) {
            if (errors.length) {
                var messages = errors.map(function (error) {
                    var constraints = error.constraints;
                    return Object.values(constraints).join(' ; ');
                }).join(' ; ');
                // Validation failed!
                next(new common_1.DataValidationError(messages, 'val.middleware->valMiddleware'));
            }
            else {
                // Validation succeeded, move to next middleware
                next();
            }
        })
            .catch(function (error) {
            next(new common_1.DataValidationError(error.message, 'val.middleware->valMiddleware'));
        });
    };
};
exports.default = valMiddleware;
