"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./di/decorators"));
__export(require("./di/metadata"));
var opaque_token_1 = require("./di/opaque_token");
exports.OpaqueToken = opaque_token_1.OpaqueToken;
var forward_ref_1 = require("./di/forward_ref");
exports.forwardRef = forward_ref_1.forwardRef;
var provider_1 = require("./di/provider");
exports.provide = provider_1.provide;
exports.getInjectableName = provider_1.getInjectableName;
//# sourceMappingURL=di.js.map