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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResource = exports.patchResource = exports.findOneResource = exports.findResource = exports.createResource = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../models/user.entity");
var common_1 = require("../shared/common");
var createResource = function (model) { return __awaiter(void 0, void 0, void 0, function () {
    var tempObject, _a, newResource, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                tempObject = (0, typeorm_1.getRepository)(user_entity_1.User).create(model);
                return [4 /*yield*/, (0, common_1.handleAsync)((0, typeorm_1.getRepository)(user_entity_1.User).save(tempObject))];
            case 1:
                _a = _b.sent(), newResource = _a[0], error = _a[1];
                if (error)
                    throw new common_1.ServerError(error.message, "users.route -> createResource");
                return [2 /*return*/, newResource];
        }
    });
}); };
exports.createResource = createResource;
var findResource = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var allResources, error, filter, page, where, order;
    var _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                allResources = null;
                error = null;
                filter = (0, common_1.fieldFilter)(options);
                page = (0, common_1.paging)(options);
                where = (_b = options.q) !== null && _b !== void 0 ? _b : "";
                order = options.order ? "entity." + options.order : "entity.id";
                return [4 /*yield*/, (0, common_1.handleAsync)((0, typeorm_1.getRepository)(user_entity_1.User)
                        .createQueryBuilder("entity")
                        .select(filter)
                        .where("LOWER(entity.name) like LOWER(:name)", { name: "%" + where.toLowerCase() + "%" })
                        .skip(page.offset)
                        .take(page.limit)
                        .orderBy(order, "ASC")
                        .getMany())];
            case 1:
                // Partial selection
                _a = _c.sent(), allResources = _a[0], error = _a[1];
                if (error)
                    throw new common_1.ServerError(error.message, "news.route -> findResource");
                return [2 /*return*/, allResources];
        }
    });
}); };
exports.findResource = findResource;
var findOneResource = function (id, options) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, _a, resource, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                filter = (0, common_1.fieldFilter)(options);
                return [4 /*yield*/, (0, common_1.handleAsync)((0, typeorm_1.getRepository)(user_entity_1.User)
                        .createQueryBuilder("entity")
                        .select(filter)
                        .where({ id: id })
                        .getOne())];
            case 1:
                _a = _b.sent(), resource = _a[0], error = _a[1];
                if (error)
                    throw new common_1.ServerError(error.message, "news.route -> findoneResource");
                return [2 /*return*/, resource];
        }
    });
}); };
exports.findOneResource = findOneResource;
var patchResource = function (id, patchedModel) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, error, _b, resource, error2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, common_1.handleAsync)((0, typeorm_1.getRepository)(user_entity_1.User).update(id, patchedModel))];
            case 1:
                _a = _c.sent(), error = _a[1];
                if (error)
                    throw new common_1.ServerError(error.message, "users.route -> patchResource");
                return [4 /*yield*/, (0, common_1.handleAsync)((0, typeorm_1.getRepository)(user_entity_1.User).findOne(id))];
            case 2:
                _b = _c.sent(), resource = _b[0], error2 = _b[1];
                if (error2)
                    throw new common_1.ServerError(error2.message, "users.route -> patchResource");
                return [2 /*return*/, resource];
        }
    });
}); };
exports.patchResource = patchResource;
var deleteResource = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, result, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, common_1.handleAsync)((0, typeorm_1.getRepository)(user_entity_1.User).delete(id))];
            case 1:
                _a = _b.sent(), result = _a[0], error = _a[1];
                if (error)
                    throw new common_1.ServerError(error.message, "users.route -> deleteResource");
                return [2 /*return*/, result];
        }
    });
}); };
exports.deleteResource = deleteResource;
