"use strict";
var lang_1 = require("../../facade/lang");
var reflection_1 = require("../reflection/reflection");
var pipe_provider_1 = require("../pipes/pipe_provider");
var directive_provider_1 = require("../directives/directive_provider");
var collections_1 = require("../../facade/collections");
var forward_ref_1 = require("./forward_ref");
var exceptions_1 = require("../../facade/exceptions");
var provider_util_1 = require("./provider_util");
var provider_util_2 = require("./provider_util");
var provider_util_3 = require("./provider_util");
var Provider = (function () {
    function Provider(token, _a) {
        var useClass = _a.useClass, useValue = _a.useValue, useExisting = _a.useExisting, useFactory = _a.useFactory, deps = _a.deps, multi = _a.multi;
        this.token = token;
        this.useClass = useClass;
        this.useValue = useValue;
        this.useExisting = useExisting;
        this.useFactory = useFactory;
        this.dependencies = deps;
        this._multi = multi;
    }
    Object.defineProperty(Provider.prototype, "multi", {
        /**
         * Creates multiple providers matching the same token (a multi-provider).
         *
         * Multi-providers are used for creating pluggable service, where the system comes
         * with some default providers, and the user can register additional providers.
         * The combination of the default providers and the additional providers will be
         * used to drive the behavior of the system.
         *
         * ### Example
         *
         * ```typescript
         * var injector = Injector.resolveAndCreate([
         *   new Provider("Strings", { useValue: "String1", multi: true}),
         *   new Provider("Strings", { useValue: "String2", multi: true})
         * ]);
         *
         * expect(injector.get("Strings")).toEqual(["String1", "String2"]);
         * ```
         *
         * Multi-providers and regular providers cannot be mixed. The following
         * will throw an exception:
         *
         * ```typescript
         * var injector = Injector.resolveAndCreate([
         *   new Provider("Strings", { useValue: "String1", multi: true }),
         *   new Provider("Strings", { useValue: "String2"})
         * ]);
         * ```
         */
        get: function () { return lang_1.normalizeBool(this._multi); },
        enumerable: true,
        configurable: true
    });
    return Provider;
}());
exports.Provider = Provider;
var ProviderBuilder = (function () {
    function ProviderBuilder() {
    }
    ProviderBuilder.createFromType = function (type, _a) {
        var useClass = _a.useClass, useValue = _a.useValue, useFactory = _a.useFactory, deps = _a.deps;
        // ...provide('myFactory',{useFactory: () => () => { return new Foo(); } })
        if (lang_1.isPresent(useFactory)) {
            var factoryToken = getInjectableName(type);
            var injectableDeps = lang_1.isArray(deps) ? deps.map(getInjectableName) : [];
            useFactory.$inject = injectableDeps;
            return [
                factoryToken,
                useFactory
            ];
        }
        // ...provide(opaqueTokenInst,{useValue: {foo:12312} })
        // ...provide('myValue',{useValue: {foo:12312} })
        if (lang_1.isPresent(useValue)) {
            var valueToken = getInjectableName(type);
            return [
                valueToken,
                useValue
            ];
        }
        var injectableType = lang_1.isString(type) || provider_util_1.isOpaqueToken(type)
            ? forward_ref_1.resolveForwardRef(useClass)
            : forward_ref_1.resolveForwardRef(type);
        var overrideName = lang_1.isString(type) || provider_util_1.isOpaqueToken(type)
            ? getInjectableName(type)
            : '';
        if (!lang_1.isType(injectableType)) {
            throw new Error("\n      Provider registration: \"" + lang_1.stringify(injectableType) + "\":\n      =======================================================\n      token " + lang_1.stringify(injectableType) + " must be type of Type, You cannot provide none class\n      ");
        }
        /**
         *
         * @type {any[]}
         */
        var annotations = reflection_1.reflector.annotations(injectableType);
        var rootAnnotation = annotations[0];
        // No Annotation === it's config function !!!
        // NOTE: we are not checking anymore if user annotated the class or not,
        // we cannot do that anymore at the costs for nic config functions registration
        if (collections_1.ListWrapper.isEmpty(annotations)) {
            return [injectableType];
        }
        if (collections_1.ListWrapper.size(annotations) > 1) {
            var hasComponentAnnotation = annotations.some(function (meta) { return provider_util_2.isComponent(meta); });
            var hasNotAllowedSecondAnnotation = annotations.some(function (meta) {
                return provider_util_1.isDirectiveLike(meta) || provider_util_1.isService(meta) || provider_util_1.isPipe(meta);
            });
            if (!hasComponentAnnotation || (hasNotAllowedSecondAnnotation && hasComponentAnnotation)) {
                throw Error("\n        Provider registration: \"" + lang_1.stringify(injectableType) + "\":\n        =======================================================\n        - you cannot use more than 1 class decorator,\n        - you've used " + annotations.map(function (meta) { return lang_1.stringify(meta.constructor); }) + "\n        Multiple class decorators are allowed only for component class: [ @Component, @StateConfig? ]\n        ");
            }
        }
        injectableType.$inject = _dependenciesFor(injectableType);
        if (provider_util_1.isPipe(rootAnnotation)) {
            return pipe_provider_1.pipeProvider.createFromType(injectableType);
        }
        if (provider_util_1.isDirectiveLike(rootAnnotation)) {
            return directive_provider_1.directiveProvider.createFromType(injectableType);
        }
        if (provider_util_1.isService(rootAnnotation)) {
            return [
                overrideName || rootAnnotation.id,
                injectableType
            ];
        }
    };
    return ProviderBuilder;
}());
/**
 * should extract the string token from provided Type and add $inject angular 1 annotation to constructor if @Inject
 * was used
 * @returns {[string,Type]}
 * @deprecated
 */
function provide(type, _a) {
    var _b = _a === void 0 ? {} : _a, useClass = _b.useClass, useValue = _b.useValue, useFactory = _b.useFactory, deps = _b.deps;
    return ProviderBuilder.createFromType(type, { useClass: useClass, useValue: useValue, useFactory: useFactory, deps: deps });
}
exports.provide = provide;
/**
 * creates $inject array Angular 1 DI annotation strings for provided Type
 * @param typeOrFunc
 * @returns {any}
 * @private
 * @internal
 */
function _dependenciesFor(typeOrFunc) {
    var params = reflection_1.reflector.parameters(typeOrFunc);
    if (lang_1.isBlank(params))
        return [];
    if (params.some(function (param) { return lang_1.isBlank(param) || collections_1.ListWrapper.isEmpty(param); })) {
        throw new Error(exceptions_1.getErrorMsg(typeOrFunc, "you cannot have holes in constructor DI injection"));
    }
    return params
        .map(function (p) { return _extractToken(p); });
}
exports._dependenciesFor = _dependenciesFor;
/**
 * should extract service/values/directives/pipes token from constructor @Inject() paramMetadata
 * @param metadata
 * @private
 * @internal
 */
function _extractToken(metadata) {
    // this is token obtained via design:paramtypes via Reflect.metadata
    var paramMetadata = metadata.filter(lang_1.isType)[0];
    // this is token obtained from @Inject() usage  for DI
    var injectMetadata = metadata.filter(provider_util_3.isInjectMetadata)[0];
    if (lang_1.isBlank(injectMetadata) && lang_1.isBlank(paramMetadata)) {
        return;
    }
    var _a = (injectMetadata || {}).token, token = _a === void 0 ? undefined : _a;
    var injectable = forward_ref_1.resolveForwardRef(token) || paramMetadata;
    return getInjectableName(injectable);
}
exports._extractToken = _extractToken;
/**
 *  A utility function that can be used to get the angular 1 injectable's name. Needed for some cases, since
 *  injectable names are auto-created.
 *
 *  Works for string/OpaqueToken/Type
 *  Note: Type must be decorated otherwise it throws
 *
 *  @example
 *  ```typescript
 *  import { Injectable, getInjectableName } from 'ng-metadata/core';
 *  // this is given some random name like 'myService48' when it's created with `module.service`
 *
 *  @Injectable
 *  class MyService {}
 *
 *  console.log(getInjectableName(MyService)); // 'myService48'
 *  ```
 *
 * @param {ProviderType}  injectable
 * @returns {string}
 */
function getInjectableName(injectable) {
    // @Inject('foo') foo
    if (lang_1.isString(injectable)) {
        return injectable;
    }
    // const fooToken = new OpaqueToken('foo')
    // @Inject(fooToken) foo
    if (provider_util_1.isOpaqueToken(injectable)) {
        return injectable.desc;
    }
    // @Injectable()
    // class SomeService(){}
    //
    // @Inject(SomeService) someSvc
    // someSvc: SomeService
    if (lang_1.isType(injectable)) {
        // only the first class annotations is injectable
        var annotation = reflection_1.reflector.annotations(injectable)[0];
        if (lang_1.isBlank(annotation)) {
            throw new Error("\n        cannot get injectable name token from none decorated class " + lang_1.getFuncName(injectable) + "\n        Only decorated classes by one of [ @Injectable,@Directive,@Component,@Pipe ], can be injected by reference\n      ");
        }
        if (provider_util_1.isPipe(annotation)) {
            return annotation.name;
        }
        if (provider_util_1.isDirectiveLike(annotation)) {
            return lang_1.resolveDirectiveNameFromSelector(annotation.selector);
        }
        if (provider_util_1.isService(annotation)) {
            return annotation.id;
        }
    }
}
exports.getInjectableName = getInjectableName;
/**
 *
 * @param metadata
 * @returns {boolean}
 * @private
 * @internal
 * @deprecated
 *
 * @TODO: delete this
 */
function _areAllDirectiveInjectionsAtTail(metadata) {
    return metadata.every(function (paramMetadata, idx, arr) {
        var isCurrentDirectiveInjection = paramMetadata.length > 1;
        var hasPrev = idx > 0;
        var hasNext = idx < arr.length - 1;
        if (hasPrev) {
            var prevInjection = arr[idx - 1];
            var isPrevDirectiveInjection = prevInjection.length > 1;
            if (isPrevDirectiveInjection && !isCurrentDirectiveInjection) {
                return false;
            }
        }
        if (hasNext) {
            var nextInjection = arr[idx + 1];
            var isNextDirectiveInjection = nextInjection.length > 1;
            if (!isNextDirectiveInjection && isNextDirectiveInjection) {
                return false;
            }
        }
        return true;
    });
}
exports._areAllDirectiveInjectionsAtTail = _areAllDirectiveInjectionsAtTail;
//# sourceMappingURL=provider.js.map