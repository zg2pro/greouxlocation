"use strict";
var lang_1 = require("../../facade/lang");
var reflection_1 = require("../reflection/reflection");
var metadata_1 = require("../di/metadata");
var key_1 = require("../di/key");
function makeDecorator(AnnotationCls, chainFn) {
    if (chainFn === void 0) { chainFn = null; }
    function DecoratorFactory(objOrType) {
        var annotationInstance = new AnnotationCls(objOrType);
        if (this instanceof AnnotationCls) {
            return annotationInstance;
        }
        else {
            //var chainAnnotation = isFunction( this ) && this.annotations instanceof Array
            //  ? this.annotations
            //  : [];
            //chainAnnotation.push(annotationInstance);
            if (chainFn) {
                chainFn(TypeDecorator);
            }
            return TypeDecorator;
        }
        function TypeDecorator(cls) {
            /**
             * here we are creating generated name for Services
             * so we can acquire the key for AngularJS DI
             * and we have unique names after mangling our JS
             */
            if (annotationInstance instanceof metadata_1.InjectableMetadata) {
                // set id if it was explicitly provided by user @Injectable('mySvc') otherwise generate
                annotationInstance.id = annotationInstance.id || key_1.globalKeyRegistry.get(cls);
            }
            var annotations = reflection_1.reflector.ownAnnotations(cls);
            annotations = annotations || [];
            annotations.push(annotationInstance);
            reflection_1.reflector.registerAnnotations(annotations, cls);
            return cls;
        }
    }
    DecoratorFactory.prototype = Object.create(AnnotationCls.prototype);
    return DecoratorFactory;
}
exports.makeDecorator = makeDecorator;
function makeParamDecorator(annotationCls, overrideParamDecorator) {
    if (overrideParamDecorator === void 0) { overrideParamDecorator = null; }
    function ParamDecoratorFactory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // create new annotation instance with annotation decorator on proto
        var annotationInstance = Object.create(annotationCls.prototype);
        annotationCls.apply(annotationInstance, args);
        if (this instanceof annotationCls) {
            return annotationInstance;
        }
        else {
            //(ParamDecorator as any).annotation = annotationInstance;
            return ParamDecorator;
        }
        /**
         * paramDecorators are 2 dimensional arrays
         * @param cls
         * @param unusedKey
         * @param index
         * @returns {any}
         * @constructor
         */
        function ParamDecorator(cls, unusedKey, index) {
            // this is special behaviour for non constructor param Injection
            if (lang_1.isFunction(overrideParamDecorator) && lang_1.isPresent(unusedKey)) {
                return overrideParamDecorator(annotationInstance, cls, unusedKey, index);
            }
            var parameters = reflection_1.reflector.rawParameters(cls);
            parameters = parameters || [];
            // there might be gaps if some in between parameters do not have annotations.
            // we pad with nulls.
            while (parameters.length <= index) {
                parameters.push(null);
            }
            parameters[index] = parameters[index] || [];
            var annotationsForParam = parameters[index];
            annotationsForParam.push(annotationInstance);
            reflection_1.reflector.registerParameters(parameters, cls);
            return cls;
        }
    }
    ParamDecoratorFactory.prototype = Object.create(annotationCls.prototype);
    return ParamDecoratorFactory;
}
exports.makeParamDecorator = makeParamDecorator;
function makePropDecorator(decoratorCls) {
    function PropDecoratorFactory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var decoratorInstance = Object.create(decoratorCls.prototype);
        decoratorCls.apply(decoratorInstance, args);
        // check if this decorator was already invoked
        // - if it was return it again, just with newly applied arguments
        // - this is possible thanks to PropDecoratorFactory.prototype = Object.create(decoratorCls.prototype);
        if (this instanceof decoratorCls) {
            return decoratorInstance;
        }
        else {
            return function PropDecorator(target, name) {
                var meta = reflection_1.reflector.ownPropMetadata(target.constructor);
                meta = meta || {};
                meta[name] = meta[name] || [];
                meta[name].unshift(decoratorInstance);
                reflection_1.reflector.registerPropMetadata(meta, target.constructor);
            };
        }
    }
    // caching
    PropDecoratorFactory.prototype = Object.create(decoratorCls.prototype);
    return PropDecoratorFactory;
}
exports.makePropDecorator = makePropDecorator;
//# sourceMappingURL=decorators.js.map