"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var reflector_reader_1 = require("./reflector_reader");
/**
 * Reflective information about a symbol, including annotations, interfaces, and other metadata.
 */
var ReflectionInfo = (function () {
    function ReflectionInfo(annotations, parameters, factory, interfaces, propMetadata) {
        this.annotations = annotations;
        this.parameters = parameters;
        this.factory = factory;
        this.interfaces = interfaces;
        this.propMetadata = propMetadata;
    }
    return ReflectionInfo;
}());
exports.ReflectionInfo = ReflectionInfo;
/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
var Reflector = (function (_super) {
    __extends(Reflector, _super);
    function Reflector(reflectionCapabilities) {
        var _this = _super.call(this) || this;
        // this._usedKeys = null;
        _this.reflectionCapabilities = reflectionCapabilities;
        return _this;
    }
    Reflector.prototype.isReflectionEnabled = function () { return this.reflectionCapabilities.isReflectionEnabled(); };
    Reflector.prototype.parameters = function (typeOrFunc) {
        // // get cached
        // if (this._injectableInfo.has(typeOrFunc)) {
        //   var res = this._getReflectionInfo(typeOrFunc).parameters;
        //   return isPresent(res) ? res : [];
        // } else {
        return this.reflectionCapabilities.parameters(typeOrFunc);
        // }
    };
    Reflector.prototype.rawParameters = function (typeOrFunc) {
        return this.reflectionCapabilities.rawParameters(typeOrFunc);
    };
    Reflector.prototype.registerParameters = function (parameters, typeOrFunc) {
        this.reflectionCapabilities.registerParameters(parameters, typeOrFunc);
    };
    Reflector.prototype.annotations = function (typeOrFunc) {
        // // get cached
        // if (this._injectableInfo.has(typeOrFunc)) {
        //   var res = this._getReflectionInfo(typeOrFunc).annotations;
        //   return isPresent(res) ? res : [];
        // } else {
        return this.reflectionCapabilities.annotations(typeOrFunc);
        // }
    };
    Reflector.prototype.ownAnnotations = function (typeOrFunc) {
        return this.reflectionCapabilities.ownAnnotations(typeOrFunc);
    };
    Reflector.prototype.registerAnnotations = function (parameters, typeOrFunc) {
        this.reflectionCapabilities.registerAnnotations(parameters, typeOrFunc);
    };
    Reflector.prototype.propMetadata = function (typeOrFunc) {
        // // get cached
        // if (this._injectableInfo.has(typeOrFunc)) {
        //   var res = this._getReflectionInfo(typeOrFunc).propMetadata;
        //   return isPresent(res) ? res : {};
        // } else {
        return this.reflectionCapabilities.propMetadata(typeOrFunc);
        // }
    };
    Reflector.prototype.ownPropMetadata = function (typeOrFunc) {
        return this.reflectionCapabilities.ownPropMetadata(typeOrFunc);
    };
    Reflector.prototype.registerPropMetadata = function (parameters, typeOrFunc) {
        this.reflectionCapabilities.registerPropMetadata(parameters, typeOrFunc);
    };
    Reflector.prototype.registerDowngradedNg2ComponentName = function (componentName, typeOrFunc) {
        this.reflectionCapabilities.registerDowngradedNg2ComponentName(componentName, typeOrFunc);
    };
    Reflector.prototype.downgradedNg2ComponentName = function (typeOrFunc) {
        return this.reflectionCapabilities.downgradedNg2ComponentName(typeOrFunc);
    };
    /** @internal */
    Reflector.prototype._getReflectionInfo = function (typeOrFunc) {
        /*if (isPresent(this._usedKeys)) {
         this._usedKeys.add(typeOrFunc);
         }
         return this._injectableInfo.get(typeOrFunc);*/
    };
    /** @internal */
    Reflector.prototype._containsReflectionInfo = function (typeOrFunc) { };
    return Reflector;
}(reflector_reader_1.ReflectorReader));
exports.Reflector = Reflector;
//# sourceMappingURL=reflector.js.map