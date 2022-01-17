"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("./shared/config"));
var config = {
    type: 'postgres',
    host: config_1.default.get('DATABASE_HOST'),
    port: config_1.default.get('DATABASE_PORT'),
    username: config_1.default.get('DATABASE_USERNAME'),
    password: config_1.default.get('DATABASE_PASSWORD'),
    database: config_1.default.get('DATABASE'),
    entities: [
        __dirname + "/models/*.entity{.ts,.js}"
    ],
    synchronize: true
};
exports.default = config;
