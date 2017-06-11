"use strict";
var lang_1 = require("../facade/lang");
var bundler_1 = require("../core/util/bundler");
function _getAppRoot(element) {
    if (typeof element === 'string') {
        return document.querySelector(element);
    }
    return element;
}
prodModeConfig.$inject = ['$compileProvider', '$httpProvider'];
function prodModeConfig($compileProvider, $httpProvider) {
    $compileProvider.debugInfoEnabled(false);
    $httpProvider.useApplyAsync(true);
}
function createBootstrapFn(bootstrapFn) {
    if (bootstrapFn === void 0) { bootstrapFn = lang_1.global.angular.bootstrap.bind(lang_1.global.angular); }
    /**
     * bootstrap angular app
     * @param {Type}  NgModule
     * @param {Array<any>}  providers
     */
    return function bootstrapModule(NgModule) {
        var angular1Module = bundler_1.bundle(NgModule);
        var angular1ModuleName = angular1Module.name;
        var strictDi = true;
        var element = document;
        if (lang_1.assertionsEnabled()) {
            console.info('Angular is running in the development mode. Call enableProdMode() to enable the production mode.');
        }
        else {
            lang_1.global.angular.module(angular1ModuleName).config(prodModeConfig);
        }
        var appRoot = _getAppRoot(element);
        lang_1.global.angular.element(document).ready(function () {
            bootstrapFn(appRoot, [angular1ModuleName], {
                strictDi: strictDi
            });
        });
    };
}
exports.createBootstrapFn = createBootstrapFn;
//# sourceMappingURL=browser_utils.js.map