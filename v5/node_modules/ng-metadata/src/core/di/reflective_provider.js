"use strict";
var lang_1 = require("../../facade/lang");
var reflection_1 = require("../reflection/reflection");
var provider_1 = require("./provider");
var provider_util_1 = require("./provider_util");
/**
 * process provider literals and return map for angular1Module consumption
 * @param provider
 * @returns {{method: string, name: string, value: any}}
 */
function resolveReflectiveProvider(provider) {
    var token = provider.token;
    if (lang_1.isPresent(provider.useValue)) {
        var _a = provider_1.provide(token, { useValue: provider.useValue }), name_1 = _a[0], value = _a[1];
        var method = 'value';
        return { method: method, name: name_1, value: value };
    }
    if (provider.useFactory) {
        var _b = provider_1.provide(token, { useFactory: provider.useFactory, deps: provider.dependencies }), name_2 = _b[0], value = _b[1];
        var method = 'factory';
        return { method: method, name: name_2, value: value };
    }
    if (provider.useClass) {
        var _c = provider_1.provide(token, { useClass: provider.useClass }), name_3 = _c[0], value = _c[1];
        var method = 'service';
        return { method: method, name: name_3, value: value };
    }
    if (provider.useExisting) {
        var _d = provider_1.provide(provider.useExisting), name_4 = _d[0], value = _d[1];
        var method = 'factory';
        throw new Error('useExisting is unimplemented');
    }
    throw new Error('invalid provider type! please specify one of: [useValue,useFactory,useClass]');
}
exports.resolveReflectiveProvider = resolveReflectiveProvider;
/**
 * returns StringMap of values needed for angular1Module registration and duplicity checks
 * @param injectable
 * @returns {any}
 * @private
 */
function _getAngular1ModuleMetadataByType(injectable) {
    // only the first class annotations is injectable
    var annotation = reflection_1.reflector.annotations(injectable)[0];
    if (lang_1.isBlank(annotation)) {
        // support configPhase ( function or pure class )
        if (lang_1.isType(injectable)) {
            return {
                providerName: '$injector',
                providerMethod: 'invoke',
                moduleMethod: 'config'
            };
        }
        throw new Error("\n        cannot get injectable name token from none decorated class " + lang_1.getFuncName(injectable) + "\n        Only decorated classes by one of [ @Injectable,@Directive,@Component,@Pipe ], can be injected by reference\n      ");
    }
    if (provider_util_1.isPipe(annotation)) {
        return {
            providerName: '$filterProvider',
            providerMethod: 'register',
            moduleMethod: 'filter'
        };
    }
    if (provider_util_1.isDirectiveLike(annotation)) {
        return {
            providerName: '$compileProvider',
            providerMethod: 'directive',
            moduleMethod: 'directive'
        };
    }
    if (provider_util_1.isService(annotation)) {
        return {
            providerName: '$provide',
            providerMethod: 'service',
            moduleMethod: 'service'
        };
    }
}
exports._getAngular1ModuleMetadataByType = _getAngular1ModuleMetadataByType;
/**
 * run through Component tree and register everything that is registered via Metadata
 * - works for nested arrays like angular 2 does ;)
 * @param angular1Module
 * @param providers
 * @returns {ng.IModule}
 * @private
 */
function _normalizeProviders(angular1Module, providers) {
    providers.forEach(function (providerType) {
        // this is for legacy Angular 1 module
        if (lang_1.isString(providerType)) {
            angular1Module.requires.push(providerType);
            return;
        }
        // this works only for value,factory,aliased services
        // you cannot register directive/pipe within provider literal
        if (provider_util_1.isProviderLiteral(providerType)) {
            var provider = provider_util_1.createProvider(providerType);
            var _a = resolveReflectiveProvider(provider), method = _a.method, name_5 = _a.name, value = _a.value;
            if (!_isTypeRegistered(name_5, angular1Module, '$provide', method)) {
                angular1Module[method](name_5, value);
            }
            return;
        }
        // this is for pipes/directives/services
        if (lang_1.isType(providerType)) {
            // const provider = createProvider( {provide:b, useClass:b} );
            // const { method, name, value } = resolveReflectiveProvider( provider );
            var _b = provider_1.provide(providerType), name_6 = _b[0], value = _b[1];
            var _c = _getAngular1ModuleMetadataByType(providerType), providerName = _c.providerName, providerMethod = _c.providerMethod, moduleMethod = _c.moduleMethod;
            // config phase support
            if (lang_1.isType(name_6)) {
                angular1Module.config(name_6);
                return;
            }
            if (!_isTypeRegistered(name_6, angular1Module, providerName, providerMethod)) {
                // @TODO register via this once requires are resolved for 3 types of attr directive from template
                // _registerTypeProvider( angular1Module, providerType, { moduleMethod, name, value } );
                angular1Module[moduleMethod](name_6, value);
            }
            return;
        }
        // un flattened array, unwrap and parse next array level of providers
        if (lang_1.isArray(providerType)) {
            _normalizeProviders(angular1Module, providerType);
        }
        else {
            throw new Error("InvalidProviderError(" + providerType + ")");
        }
    });
    // return res;
    return angular1Module;
}
exports._normalizeProviders = _normalizeProviders;
/**
 * check if `findRegisteredType` is registered within angular1Module, so we don't have duplicates
 * @param findRegisteredType
 * @param angular1Module
 * @param instanceType
 * @param methodName
 * @returns {boolean}
 * @private
 */
function _isTypeRegistered(findRegisteredType, angular1Module, instanceType, methodName) {
    var invokeQueue = angular1Module._invokeQueue;
    var types = invokeQueue
        .filter(function (_a) {
        var type = _a[0], fnName = _a[1];
        return type === instanceType && fnName === methodName;
    })
        .map(function (_a) {
        var type = _a[0], fnName = _a[1], registeredProvider = _a[2];
        return registeredProvider;
    });
    return types.some(function (_a) {
        var typeName = _a[0], typeFn = _a[1];
        return findRegisteredType === typeName;
    });
}
exports._isTypeRegistered = _isTypeRegistered;
/**
 * we need to register 3 types of attribute directives, if we are registering directive,
 * because we need to allow all 3 types of binding on the defined directive [name],(name),name
 * @private
 */
function _registerTypeProvider(angular1Module, provider, _a) {
    var moduleMethod = _a.moduleMethod, name = _a.name, value = _a.value;
    // only the first class annotations is injectable
    var annotation = reflection_1.reflector.annotations(provider)[0];
    if (lang_1.isBlank(annotation)) {
        return;
    }
    // we need to register attr directives for all possible binding types
    if (provider_util_1.isDirective(annotation)) {
        angular1Module[moduleMethod](name, value);
        angular1Module[moduleMethod]("[" + name + "]", value);
        angular1Module[moduleMethod]("(" + name + ")", value);
    }
    else {
        angular1Module[moduleMethod](name, value);
    }
}
exports._registerTypeProvider = _registerTypeProvider;
//# sourceMappingURL=reflective_provider.js.map