"use strict";
var lang_1 = require("../../facade/lang");
var collections_1 = require("../../facade/collections");
// import {BaseException} from 'angular2/src/facade/exceptions';
// This will be needed when we will used Reflect APIs
var Reflect = lang_1.global.Reflect;
if (!isReflectMetadata(Reflect)) {
    throw "\n    Reflect.*metadata shim is required when using class decorators.\n    You can use one of: \n    - \"reflect-metadata\" (https://www.npmjs.com/package/reflect-metadata) \n    - \"core-js/es7/reflect\" (https://github.com/zloirock/core-js)\n  ";
}
/**
 * @internal
 */
exports.CLASS_META_KEY = 'annotations';
/**
 * @internal
 */
exports.PARAM_META_KEY = 'parameters';
/**
 * @internal
 */
exports.PARAM_REFLECT_META_KEY = 'design:paramtypes';
/**
 * @internal
 */
exports.PROP_META_KEY = 'propMetadata';
/**
 * @internal
 */
exports.DOWNGRADED_COMPONENT_NAME_KEY = 'downgradeComponentName';
function isReflectMetadata(reflect) {
    return lang_1.isPresent(reflect) && lang_1.isPresent(reflect.getMetadata);
}
var ReflectionCapabilities = (function () {
    function ReflectionCapabilities(reflect) {
        if (reflect === void 0) { reflect = lang_1.global.Reflect; }
        this._reflect = reflect;
    }
    ReflectionCapabilities.prototype.isReflectionEnabled = function () { return true; };
    ReflectionCapabilities.prototype.factory = function (t) {
        switch (t.length) {
            case 0:
                return function () { return new t(); };
            case 1:
                return function (a1) { return new t(a1); };
            case 2:
                return function (a1, a2) { return new t(a1, a2); };
            case 3:
                return function (a1, a2, a3) { return new t(a1, a2, a3); };
            case 4:
                return function (a1, a2, a3, a4) { return new t(a1, a2, a3, a4); };
            case 5:
                return function (a1, a2, a3, a4, a5) { return new t(a1, a2, a3, a4, a5); };
            case 6:
                return function (a1, a2, a3, a4, a5, a6) {
                    return new t(a1, a2, a3, a4, a5, a6);
                };
            case 7:
                return function (a1, a2, a3, a4, a5, a6, a7) {
                    return new t(a1, a2, a3, a4, a5, a6, a7);
                };
            case 8:
                return function (a1, a2, a3, a4, a5, a6, a7, a8) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8);
                };
            case 9:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9);
                };
            case 10:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) { return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10); };
            case 11:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) { return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11); };
            case 12:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
                };
            case 13:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
                };
            case 14:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14);
                };
            case 15:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
                };
            case 16:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16);
                };
            case 17:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17) {
                    return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17);
                };
            case 18:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18) { return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18); };
            case 19:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19) { return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19); };
            case 20:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20) { return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20); };
        }
        throw new Error("Cannot create a factory for '" + lang_1.stringify(t) + "' because its constructor has more than 20 arguments");
    };
    /** @internal */
    ReflectionCapabilities.prototype._zipTypesAndAnnotations = function (paramTypes, paramAnnotations) {
        var result;
        if (typeof paramTypes === 'undefined') {
            result = new Array(paramAnnotations.length);
        }
        else {
            result = new Array(paramTypes.length);
        }
        for (var i = 0; i < result.length; i++) {
            // TS outputs Object for parameters without types, while Traceur omits
            // the annotations. For now we preserve the Traceur behavior to aid
            // migration, but this can be revisited.
            if (typeof paramTypes === 'undefined') {
                result[i] = [];
            }
            else if (paramTypes[i] != Object) {
                result[i] = [paramTypes[i]];
            }
            else {
                result[i] = [];
            }
            if (lang_1.isPresent(paramAnnotations) && lang_1.isPresent(paramAnnotations[i])) {
                result[i] = result[i].concat(paramAnnotations[i]);
            }
        }
        return result;
    };
    ReflectionCapabilities.prototype.parameters = function (typeOrFunc) {
        // // Prefer the direct API.
        // if (isPresent((<any>typeOrFunc).parameters)) {
        //   return (<any>typeOrFunc).parameters;
        // }
        if (isReflectMetadata(this._reflect)) {
            // get parameter created with @Inject()
            var paramAnnotations = this._reflect.getMetadata(exports.PARAM_META_KEY, typeOrFunc);
            // get parameter created via TS type annotations
            var paramTypes = this._reflect.getMetadata(exports.PARAM_REFLECT_META_KEY, typeOrFunc);
            if (lang_1.isPresent(paramTypes) || lang_1.isPresent(paramAnnotations)) {
                return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
            }
        }
        // The array has to be filled with `undefined` because holes would be skipped by `some`
        var parameters = new Array(typeOrFunc.length);
        collections_1.ListWrapper.fill(parameters, undefined);
        // parameters.fill(undefined);
        return parameters;
    };
    ReflectionCapabilities.prototype.rawParameters = function (typeOrFunc) {
        return this._reflect.getMetadata(exports.PARAM_META_KEY, typeOrFunc);
    };
    ReflectionCapabilities.prototype.registerParameters = function (parameters, type) {
        this._reflect.defineMetadata(exports.PARAM_META_KEY, parameters, type);
    };
    ReflectionCapabilities.prototype.annotations = function (typeOrFunc) {
        // // Prefer the direct API.
        // if (isPresent((<any>typeOrFunc).annotations)) {
        //   var annotations = (<any>typeOrFunc).annotations;
        //   if (isFunction(annotations) && annotations.annotations) {
        //     annotations = annotations.annotations;
        //   }
        //   return annotations;
        // }
        if (isReflectMetadata(this._reflect)) {
            var annotations = this._reflect.getMetadata(exports.CLASS_META_KEY, typeOrFunc);
            if (lang_1.isPresent(annotations))
                return annotations;
        }
        return [];
    };
    ReflectionCapabilities.prototype.ownAnnotations = function (typeOrFunc) {
        return this._reflect.getOwnMetadata(exports.CLASS_META_KEY, typeOrFunc);
    };
    ReflectionCapabilities.prototype.registerAnnotations = function (annotations, typeOrFunc) {
        this._reflect.defineMetadata(exports.CLASS_META_KEY, annotations, typeOrFunc);
    };
    ReflectionCapabilities.prototype.propMetadata = function (typeOrFunc) {
        // // Prefer the direct API.
        // if (isPresent((<any>typeOrFunc).propMetadata)) {
        //   var propMetadata = (<any>typeOrFunc).propMetadata;
        //   if (isFunction(propMetadata) && propMetadata.propMetadata) {
        //     propMetadata = propMetadata.propMetadata;
        //   }
        //   return propMetadata;
        // }
        if (isReflectMetadata(this._reflect)) {
            var propMetadata = this._reflect.getMetadata(exports.PROP_META_KEY, typeOrFunc);
            if (lang_1.isPresent(propMetadata))
                return propMetadata;
        }
        return {};
    };
    ReflectionCapabilities.prototype.ownPropMetadata = function (typeOrFunc) {
        return this._reflect.getOwnMetadata(exports.PROP_META_KEY, typeOrFunc);
    };
    ReflectionCapabilities.prototype.registerPropMetadata = function (propMetadata, typeOrFunc) {
        this._reflect.defineMetadata(exports.PROP_META_KEY, propMetadata, typeOrFunc);
    };
    ReflectionCapabilities.prototype.registerDowngradedNg2ComponentName = function (componentName, typeOrFunc) {
        this._reflect.defineMetadata(exports.DOWNGRADED_COMPONENT_NAME_KEY, componentName, typeOrFunc);
    };
    ReflectionCapabilities.prototype.downgradedNg2ComponentName = function (typeOrFunc) {
        return this._reflect.getOwnMetadata(exports.DOWNGRADED_COMPONENT_NAME_KEY, typeOrFunc);
    };
    ReflectionCapabilities.prototype.interfaces = function (type) {
        // throw new BaseException("JavaScript does not support interfaces");
        throw new Error('JavaScript does not support interfaces');
    };
    ReflectionCapabilities.prototype.getter = function (name) { return new Function('o', 'return o.' + name + ';'); };
    ReflectionCapabilities.prototype.setter = function (name) {
        return new Function('o', 'v', 'return o.' + name + ' = v;');
    };
    ReflectionCapabilities.prototype.method = function (name) {
        var functionBody = "if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);";
        return new Function('o', 'args', functionBody);
    };
    return ReflectionCapabilities;
}());
exports.ReflectionCapabilities = ReflectionCapabilities;
//# sourceMappingURL=reflection_capabilities.js.map