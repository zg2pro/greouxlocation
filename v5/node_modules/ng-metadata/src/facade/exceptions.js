"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = require("./lang");
var BaseException = (function (_super) {
    __extends(BaseException, _super);
    function BaseException(message) {
        if (message === void 0) { message = "--"; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.stack = new Error(message).stack;
        return _this;
    }
    BaseException.prototype.toString = function () { return this.message; };
    return BaseException;
}(Error));
exports.BaseException = BaseException;
function getErrorMsg(typeOrFunc, msg) {
    return "\n      " + lang_1.getFuncName(typeOrFunc) + ":\n      ===========================\n      " + msg + "\n    ";
}
exports.getErrorMsg = getErrorMsg;
//# sourceMappingURL=exceptions.js.map