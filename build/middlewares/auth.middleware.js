"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var njwt_1 = __importDefault(require("njwt"));
var config_1 = __importDefault(require("../shared/config"));
var common_1 = require("../shared/common");
var authMiddleware = function () {
    return function (req, res, next) {
        // Retreive token from header key
        var token = req.header(config_1.default.get('jwt:headerKey'));
        if (token) {
            // Verify token is not tampered!
            njwt_1.default.verify(token, config_1.default.get('jwt:secret'), config_1.default.get('jwt:algorithm'), function (error, verifiedJwt) {
                if (error) {
                    next(new common_1.AuthenticationError(error.message, "auth.middleware->authMiddleware"));
                }
                else {
                    // jwt is valid!!
                    // 1. Get User (id) from token
                    // 2. Check User has permissions to do req.method operation
                    //     If yes -> next( )
                    //     If no -> next( new AuthorizationError(403) )
                    next();
                }
            });
        }
        else {
            next(new common_1.AuthenticationError("Jwt token not present!", "auth.middleware->authMiddleware"));
        }
    };
};
exports.default = authMiddleware;
