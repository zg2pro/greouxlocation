"use strict";
var provider_1 = require("../core/di/provider");
var primitives_1 = require("../facade/primitives");
var lang_1 = require("../facade/lang");
/**
 * factory which will return function which will be used as your render method
 */
function renderFactory($compile, $scope) {
    return _compileAndDigest;
    function _compileAndDigest(Directive, _a) {
        var _b = _a === void 0 ? {} : _a, jqHost = _b.jqHost, attrs = _b.attrs, jqChildren = _b.jqChildren;
        var ctrlName = provider_1.getInjectableName(Directive);
        var selector = primitives_1.StringWrapper.kebabCase(ctrlName);
        // is Directive
        if (jqHost) {
            jqHost.attr(selector, '');
        }
        else {
            // is Component
            var hostElement = "<" + selector + "></" + selector + ">";
            jqHost = lang_1.global.angular.element(hostElement);
        }
        // since attributes can be undefined we check them
        if (attrs) {
            jqHost.attr(attrs);
        }
        if (jqChildren) {
            jqHost.append(jqChildren);
        }
        // angular api
        var compiledElement = $compile(jqHost)($scope);
        var ctrl = compiledElement.controller(ctrlName);
        $scope.$apply();
        return { compiledElement: compiledElement, ctrl: ctrl };
    }
}
exports.renderFactory = renderFactory;
function getInput(element) {
    return element.find('input');
}
exports.getInput = getInput;
//# sourceMappingURL=utils.js.map