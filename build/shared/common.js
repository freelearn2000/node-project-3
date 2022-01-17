"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImplementedError = exports.ApiNotImplementedError = exports.AuthenticationError = exports.EntityNotFoundError = exports.DataValidationError = exports.ServerError = exports.MyError = exports.paging = exports.fieldFilter = exports.handleAsync = void 0;
var handleAsync = function (promise) {
    return promise
        .then(function (data) { return [data, null]; })
        .catch(function (error) { return [null, error]; });
};
exports.handleAsync = handleAsync;
// 1. Filter (based on fields)
// Format: ?fields=id,title
var fieldFilter = function (options) {
    var fields = options.fields;
    return fields = fields === null || fields === void 0 ? void 0 : fields.split(",").map(function (item) { return "entity." + item; });
};
exports.fieldFilter = fieldFilter;
// 2. Pagination (based on offset and limit) 
// offset : start of record
// limit : number of records
// Format : offset=0&limit=5
var paging = function (options) {
    var _a;
    var offset = (_a = options.offset) !== null && _a !== void 0 ? _a : 0;
    var limit = options.limit;
    return { offset: offset, limit: limit };
};
exports.paging = paging;
var MyError = /** @class */ (function (_super) {
    __extends(MyError, _super);
    function MyError(status, message, origin, clientMessage) {
        var _this = _super.call(this, message) || this;
        _this.status = status;
        _this.origin = origin;
        _this.clientMessage = clientMessage;
        return _this;
    }
    return MyError;
}(Error));
exports.MyError = MyError;
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError(message, origin) {
        return _super.call(this, 500, message, origin, 'Server Error!') || this;
    }
    return ServerError;
}(MyError));
exports.ServerError = ServerError;
var DataValidationError = /** @class */ (function (_super) {
    __extends(DataValidationError, _super);
    function DataValidationError(message, origin) {
        return _super.call(this, 400, message, origin, 'Data is not valid!') || this;
    }
    return DataValidationError;
}(MyError));
exports.DataValidationError = DataValidationError;
var EntityNotFoundError = /** @class */ (function (_super) {
    __extends(EntityNotFoundError, _super);
    function EntityNotFoundError(id, origin) {
        return _super.call(this, 400, "Entity with id: " + id + " not found!", origin, "Entity with id: " + id + " not found!") || this;
    }
    return EntityNotFoundError;
}(MyError));
exports.EntityNotFoundError = EntityNotFoundError;
var AuthenticationError = /** @class */ (function (_super) {
    __extends(AuthenticationError, _super);
    function AuthenticationError(error, origin) {
        return _super.call(this, 401, error !== null && error !== void 0 ? error : "Authentication Error!", origin, "Authentication Error!") || this;
    }
    return AuthenticationError;
}(MyError));
exports.AuthenticationError = AuthenticationError;
var ApiNotImplementedError = /** @class */ (function (_super) {
    __extends(ApiNotImplementedError, _super);
    function ApiNotImplementedError(message, origin) {
        return _super.call(this, 404, message, origin, "API is not implemented") || this;
    }
    return ApiNotImplementedError;
}(MyError));
exports.ApiNotImplementedError = ApiNotImplementedError;
var NotImplementedError = /** @class */ (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError(message, origin) {
        return _super.call(this, 404, message, origin, "Not implemented") || this;
    }
    return NotImplementedError;
}(MyError));
exports.NotImplementedError = NotImplementedError;
