"use strict";
var lang_1 = require("../../facade/lang");
var reflection_1 = require("../reflection/reflection");
var provider_1 = require("../di/provider");
var provider_util_1 = require("../di/provider_util");
var reflective_provider_1 = require("../di/reflective_provider");
var collections_1 = require("../../facade/collections");
function _bundleComponent(ComponentClass, otherProviders, existingAngular1Module) {
    if (otherProviders === void 0) { otherProviders = []; }
    // Support registering downgraded ng2 components directly
    var downgradedNgComponentName = reflection_1.reflector.downgradedNg2ComponentName(ComponentClass);
    if (downgradedNgComponentName) {
        var angular1Module_1 = existingAngular1Module || lang_1.global.angular.module(downgradedNgComponentName, []);
        angular1Module_1.directive(downgradedNgComponentName, ComponentClass);
        return angular1Module_1;
    }
    var angular1ModuleName = provider_1.getInjectableName(ComponentClass);
    var angular1Module = existingAngular1Module || lang_1.global.angular.module(angular1ModuleName, []);
    var annotations = reflection_1.reflector.annotations(ComponentClass);
    var cmpAnnotation = annotations[0];
    var _a = cmpAnnotation.providers, providers = _a === void 0 ? [] : _a, _b = cmpAnnotation.viewProviders, viewProviders = _b === void 0 ? [] : _b;
    // process component
    var _c = provider_1.provide(ComponentClass), cmpName = _c[0], cmpFactoryFn = _c[1];
    var _d = reflective_provider_1._getAngular1ModuleMetadataByType(ComponentClass), providerName = _d.providerName, providerMethod = _d.providerMethod, moduleMethod = _d.moduleMethod;
    if (reflective_provider_1._isTypeRegistered(cmpName, angular1Module, providerName, providerMethod)) {
        return angular1Module;
    }
    // @TODO register via this once requires are resolved for 3 types of attr directive from template
    // _registerTypeProvider( angular1Module, ComponentClass, { moduleMethod, name: cmpName, value: cmpFactoryFn } );
    angular1Module[moduleMethod](cmpName, cmpFactoryFn);
    // 1. process component/directive decorator providers/viewProviders
    reflective_provider_1._normalizeProviders(angular1Module, providers);
    reflective_provider_1._normalizeProviders(angular1Module, viewProviders);
    // 2. process otherProviders argument
    // - providers can be string(angular1Module reference), Type, StringMap(providerLiteral)
    // - directives can't be registered as via global providers only @Injectable,@Pipe,{provide:any,use*:any}
    // registerProviders(angular1Module, otherProviders);
    reflective_provider_1._normalizeProviders(angular1Module, otherProviders);
    return angular1Module;
}
function bundle(NgModuleClass, otherProviders, existingAngular1Module) {
    if (otherProviders === void 0) { otherProviders = []; }
    var angular1ModuleName = provider_1.getInjectableName(NgModuleClass);
    var angular1Module = existingAngular1Module || lang_1.global.angular.module(angular1ModuleName, []);
    var annotations = reflection_1.reflector.annotations(NgModuleClass);
    var ngModuleAnnotation = annotations[0];
    if (!provider_util_1.isNgModule(ngModuleAnnotation)) {
        throw new Error("bundle() requires a decorated NgModule as its first argument");
    }
    var _a = ngModuleAnnotation.declarations, declarations = _a === void 0 ? [] : _a, _b = ngModuleAnnotation.providers, providers = _b === void 0 ? [] : _b, _c = ngModuleAnnotation.imports, imports = _c === void 0 ? [] : _c;
    /**
     * Process `declarations`
     */
    collections_1.ListWrapper.flattenDeep(declarations).forEach(function (directiveType) {
        _bundleComponent(directiveType, [], angular1Module);
    });
    /**
     * Process `providers`
     */
    reflective_provider_1._normalizeProviders(angular1Module, providers);
    /**
     * Process `imports`
     */
    // 1. imports which are not NgModules
    var nonNgModuleImports = imports.filter(function (imported) {
        if (!lang_1.isFunction(imported)) {
            return true;
        }
        var annotations = reflection_1.reflector.annotations(imported);
        return !provider_util_1.isNgModule(ngModuleAnnotation);
    });
    reflective_provider_1._normalizeProviders(angular1Module, nonNgModuleImports);
    // 2.imports which are NgModules
    var NgModuleImports = imports.filter(function (imported) {
        if (!lang_1.isFunction(imported)) {
            return false;
        }
        var annotations = reflection_1.reflector.annotations(imported);
        return provider_util_1.isNgModule(ngModuleAnnotation);
    });
    NgModuleImports.forEach(function (importedNgModule) {
        bundle(importedNgModule, [], angular1Module);
    });
    /**
     * Process `otherProviders`
     */
    reflective_provider_1._normalizeProviders(angular1Module, otherProviders);
    return angular1Module;
}
exports.bundle = bundle;
//# sourceMappingURL=bundler.js.map