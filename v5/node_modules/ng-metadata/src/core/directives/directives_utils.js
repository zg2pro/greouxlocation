"use strict";
var metadata_directives_1 = require("./metadata_directives");
/**
 * use #isDirective instead
 * @deprecated
 */
function isAttrDirective(metadata) {
    return metadata instanceof metadata_directives_1.DirectiveMetadata && !(metadata instanceof metadata_directives_1.ComponentMetadata);
}
exports.isAttrDirective = isAttrDirective;
/**
 * use #isComponent instead
 * @deprecated
 */
function isComponentDirective(metadata) {
    return metadata instanceof metadata_directives_1.ComponentMetadata;
}
exports.isComponentDirective = isComponentDirective;
/**
 *
 * @param scope
 * @param element
 * @param ctrl
 * @param implementsNgOnDestroy
 * @param watchersToDispose
 * @param observersToDispose
 * @private
 */
function _setupDestroyHandler(scope, element, ctrl, implementsNgOnDestroy, watchersToDispose, observersToDispose) {
    if (watchersToDispose === void 0) { watchersToDispose = []; }
    if (observersToDispose === void 0) { observersToDispose = []; }
    scope.$on('$destroy', function () {
        if (implementsNgOnDestroy) {
            ctrl.ngOnDestroy();
        }
        watchersToDispose.forEach(function (_watcherDispose) { return _watcherDispose(); });
        observersToDispose.forEach(function (_observerDispose) { return _observerDispose(); });
    });
}
exports._setupDestroyHandler = _setupDestroyHandler;
//# sourceMappingURL=directives_utils.js.map