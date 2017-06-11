"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var browser_utils_1 = require("./browser_utils");
__export(require("./title"));
exports.platformBrowserDynamic = function () {
    return {
        bootstrapModule: browser_utils_1.createBootstrapFn(),
    };
};
//# sourceMappingURL=browser.js.map