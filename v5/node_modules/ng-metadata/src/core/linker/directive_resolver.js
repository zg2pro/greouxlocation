"use strict";
var lang_1 = require("../../facade/lang");
var collections_1 = require("../../facade/collections");
var reflection_1 = require("../reflection/reflection");
var metadata_directives_1 = require("../directives/metadata_directives");
var metadata_di_1 = require("../directives/metadata_di");
var metadata_1 = require("../di/metadata");
var provider_1 = require("../di/provider");
var forward_ref_1 = require("../di/forward_ref");
var exceptions_1 = require("../../facade/exceptions");
// asset:<package-name>/<realm>/<path-to-module>
// var _ASSET_URL_RE = /asset:([^\/]+)\/([^\/]+)\/(.+)/g;
// <path-to-module>/filename.js
var ASSET_URL_RE = /^(.+)\/.+\.js$/;
function _isDirectiveMetadata(type) {
    return type instanceof metadata_directives_1.DirectiveMetadata;
}
/**
 * return required string map for provided local DI
 * ```typescript
 * // for
 * constructor(@Inject('ngModel') @Self() @Optional() ngModel){}
 * // it returns:
 * { ngModel: '?ngModel' }
 *
 * // when MyComponent is
 * @Component({ selector: 'myCoolCmp', template:`hello`})
 * class MyComponent{}
 * // for
 * constructor(@Host() @Optional() myCmp: MyComponent){}
 * // it returns:
 * { myCmp: '^myCoolCmp' }
 * ```
 * @param paramsMeta
 * @param idx
 * @param typeOrFunc
 * @returns {{[directiveName]:string}}
 * @private
 */
function _transformInjectedDirectivesMeta(paramsMeta, idx, typeOrFunc) {
    if (!_isInjectableParamsDirective(paramsMeta)) {
        return;
    }
    // @TODO unite this with _extractToken from provider.ts
    var injectInst = collections_1.ListWrapper.find(paramsMeta, function (param) { return param instanceof metadata_1.InjectMetadata; });
    var injectType = collections_1.ListWrapper.find(paramsMeta, lang_1.isType);
    var _a = (injectInst || { token: injectType }).token, token = _a === void 0 ? undefined : _a;
    // we need to decrement param count if user uses both @Inject() and :MyType
    var paramsMetaLength = (injectInst && injectType)
        ? paramsMeta.length - 1
        : paramsMeta.length;
    if (!token) {
        throw new Error(exceptions_1.getErrorMsg(typeOrFunc, "no Directive instance name provided within @Inject() or :DirectiveClass annotation missing"));
    }
    var isHost = collections_1.ListWrapper.findIndex(paramsMeta, function (param) { return param instanceof metadata_1.HostMetadata; }) !== -1;
    var isOptional = collections_1.ListWrapper.findIndex(paramsMeta, function (param) { return param instanceof metadata_1.OptionalMetadata; }) !== -1;
    var isSelf = collections_1.ListWrapper.findIndex(paramsMeta, function (param) { return param instanceof metadata_1.SelfMetadata; }) !== -1;
    var isSkipSelf = collections_1.ListWrapper.findIndex(paramsMeta, function (param) { return param instanceof metadata_1.SkipSelfMetadata; }) !== -1;
    if (isOptional && paramsMetaLength !== 3) {
        throw new Error(exceptions_1.getErrorMsg(typeOrFunc, "you cannot use @Optional() without related decorator for injecting Directives. use one of @Host|@Self()|@SkipSelf() + @Optional()"));
    }
    if (isSelf && isSkipSelf) {
        throw new Error(exceptions_1.getErrorMsg(typeOrFunc, "you cannot provide both @Self() and @SkipSelf() with @Inject(" + lang_1.getFuncName(token) + ") for Directive Injection"));
    }
    if ((isHost && isSelf) || (isHost && isSkipSelf)) {
        throw new Error(exceptions_1.getErrorMsg(typeOrFunc, "you cannot provide both @Host(),@SkipSelf() or @Host(),@Self() with @Inject(" + lang_1.getFuncName(token) + ") for Directive Injections"));
    }
    var locateType = _getLocateTypeSymbol();
    var optionalType = isOptional ? '?' : '';
    var requireExpressionPrefix = "" + optionalType + locateType;
    var directiveName = _getDirectiveName(token);
    // we need to generate unique names because if we require same directive controllers,
    // with different locale decorators it would merge to one which is wrong
    return _b = {},
        _b[directiveName + "#" + idx] = "" + requireExpressionPrefix + directiveName,
        _b;
    function _getDirectiveName(token) {
        return lang_1.isType(forward_ref_1.resolveForwardRef(token))
            ? provider_1.getInjectableName(forward_ref_1.resolveForwardRef(token))
            : token;
    }
    function _getLocateTypeSymbol() {
        if (isSelf) {
            return '';
        }
        if (isHost) {
            return '^';
        }
        if (isSkipSelf) {
            return '^^';
        }
    }
    // exit if user uses both @Inject() and :Type for DI because this is not directive injection
    function _isInjectableParamsDirective(paramsMeta) {
        // if there is just @Inject or Type from design:paramtypes return
        if (paramsMeta.length < 2) {
            return false;
        }
        if (paramsMeta.length === 2) {
            var injectableParamCount = paramsMeta.filter(function (inj) { return inj instanceof metadata_1.InjectMetadata || lang_1.isType(inj); }).length;
            if (injectableParamCount === 2) {
                return false;
            }
        }
        return true;
    }
    var _b;
}
/**
 * Resolve a `Type` for {@link DirectiveMetadata}.
 */
var DirectiveResolver = (function () {
    function DirectiveResolver() {
    }
    /**
     * Return {@link DirectiveMetadata} for a given `Type`.
     */
    DirectiveResolver.prototype.resolve = function (type) {
        var metadata = this._getDirectiveMeta(type);
        var propertyMetadata = reflection_1.reflector.propMetadata(type);
        return this._mergeWithPropertyMetadata(metadata, propertyMetadata);
    };
    /**
     * transform parameter annotations to required directives map so we can use it
     * for DDO creation
     *
     * map consist of :
     *  - key == name of directive
     *  - value == Angular 1 require expression
     *  ```js
     *  {
     *    ngModel: 'ngModel',
     *    form: '^^form',
     *    foo: '^foo',
     *    moo: '?^foo',
     *  }
     *  ```
     *
     * @param {Type} type
     * @returns {StringMap}
     */
    DirectiveResolver.prototype.getRequiredDirectivesMap = function (type) {
        var metadata = this._getDirectiveMeta(type);
        var paramMetadata = reflection_1.reflector.parameters(type);
        if (lang_1.isPresent(paramMetadata)) {
            return paramMetadata
                .reduce(function (acc, paramMetaArr, idx) {
                var requireExp = _transformInjectedDirectivesMeta(paramMetaArr, idx, type);
                if (lang_1.isPresent(requireExp)) {
                    lang_1.assign(acc, requireExp);
                }
                return acc;
            }, {});
        }
        return {};
    };
    DirectiveResolver.prototype.parseAssetUrl = function (cmpMetadata) {
        if (lang_1.isBlank(cmpMetadata.moduleId)) {
            return '';
        }
        var moduleId = cmpMetadata.moduleId;
        var _a = moduleId.match(ASSET_URL_RE) || [], _b = _a[1], urlPathMatch = _b === void 0 ? '' : _b;
        return urlPathMatch + "/";
    };
    /**
     *
     * @param type
     * @returns {DirectiveMetadata}
     * @throws Error
     * @private
     */
    DirectiveResolver.prototype._getDirectiveMeta = function (type) {
        var typeMetadata = reflection_1.reflector.annotations(forward_ref_1.resolveForwardRef(type));
        if (lang_1.isPresent(typeMetadata)) {
            var metadata = collections_1.ListWrapper.find(typeMetadata, _isDirectiveMetadata);
            if (lang_1.isPresent(metadata)) {
                return metadata;
            }
        }
        throw new Error("No Directive annotation found on " + lang_1.stringify(type));
    };
    DirectiveResolver.prototype._mergeWithPropertyMetadata = function (directiveMetadata, propertyMetadata) {
        var inputs = [];
        var attrs = [];
        var outputs = [];
        var host = {};
        var queries = {};
        collections_1.StringMapWrapper.forEach(propertyMetadata, function (metadata, propName) {
            metadata.forEach(function (propMetaInst) {
                if (propMetaInst instanceof metadata_directives_1.InputMetadata) {
                    if (lang_1.isPresent(propMetaInst.bindingPropertyName)) {
                        inputs.push(propName + ": " + propMetaInst.bindingPropertyName);
                    }
                    else {
                        inputs.push(propName);
                    }
                }
                if (propMetaInst instanceof metadata_directives_1.AttrMetadata) {
                    if (lang_1.isPresent(propMetaInst.bindingPropertyName)) {
                        attrs.push(propName + ": " + propMetaInst.bindingPropertyName);
                    }
                    else {
                        attrs.push(propName);
                    }
                }
                if (propMetaInst instanceof metadata_directives_1.OutputMetadata) {
                    if (lang_1.isPresent(propMetaInst.bindingPropertyName)) {
                        outputs.push(propName + ": " + propMetaInst.bindingPropertyName);
                    }
                    else {
                        outputs.push(propName);
                    }
                }
                if (propMetaInst instanceof metadata_directives_1.HostBindingMetadata) {
                    if (lang_1.isPresent(propMetaInst.hostPropertyName)) {
                        host["[" + propMetaInst.hostPropertyName + "]"] = propName;
                    }
                    else {
                        host["[" + propName + "]"] = propName;
                    }
                }
                if (propMetaInst instanceof metadata_directives_1.HostListenerMetadata) {
                    var args = lang_1.isPresent(propMetaInst.args)
                        ? propMetaInst.args.join(', ')
                        : '';
                    host["(" + propMetaInst.eventName + ")"] = propName + "(" + args + ")";
                }
                if (propMetaInst instanceof metadata_di_1.ContentChildrenMetadata) {
                    queries[propName] = propMetaInst;
                }
                if (propMetaInst instanceof metadata_di_1.ViewChildrenMetadata) {
                    queries[propName] = propMetaInst;
                }
                if (propMetaInst instanceof metadata_di_1.ContentChildMetadata) {
                    queries[propName] = propMetaInst;
                }
                if (propMetaInst instanceof metadata_di_1.ViewChildMetadata) {
                    queries[propName] = propMetaInst;
                }
            });
        });
        return this._merge(directiveMetadata, inputs, attrs, outputs, host, queries);
    };
    DirectiveResolver.prototype._merge = function (dm, inputs, attrs, outputs, host, queries) {
        var mergedInputs = lang_1.isPresent(dm.inputs)
            ? collections_1.ListWrapper.concat(dm.inputs, inputs)
            : inputs;
        var mergedAttrs = lang_1.isPresent(dm.attrs)
            ? collections_1.ListWrapper.concat(dm.attrs, attrs)
            : attrs;
        var mergedOutputs = lang_1.isPresent(dm.outputs)
            ? collections_1.ListWrapper.concat(dm.outputs, outputs)
            : outputs;
        var mergedHost = lang_1.isPresent(dm.host)
            ? collections_1.StringMapWrapper.merge(dm.host, host)
            : host;
        var mergedQueries = lang_1.isPresent(dm.queries)
            ? collections_1.StringMapWrapper.merge(dm.queries, queries)
            : queries;
        var directiveSettings = {
            selector: dm.selector,
            inputs: mergedInputs,
            attrs: mergedAttrs,
            outputs: mergedOutputs,
            host: mergedHost,
            queries: mergedQueries,
            legacy: dm.legacy
        };
        if (dm instanceof metadata_directives_1.ComponentMetadata) {
            var componentSettings = collections_1.StringMapWrapper.assign({}, directiveSettings, {
                moduleId: dm.moduleId,
                template: dm.template,
                templateUrl: dm.templateUrl,
                changeDetection: lang_1.isPresent(dm.changeDetection) ? dm.changeDetection : 1 /* Default */
            });
            return new metadata_directives_1.ComponentMetadata(componentSettings);
        }
        else {
            return new metadata_directives_1.DirectiveMetadata(directiveSettings);
        }
    };
    return DirectiveResolver;
}());
exports.DirectiveResolver = DirectiveResolver;
//# sourceMappingURL=directive_resolver.js.map