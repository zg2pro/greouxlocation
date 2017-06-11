"use strict";
var lang_1 = require("../../facade/lang");
var metadata_directives_1 = require("../directives/metadata_directives");
var metadata_1 = require("../pipes/metadata");
var provider_1 = require("./provider");
var opaque_token_1 = require("./opaque_token");
var metadata_2 = require("./metadata");
function isProviderLiteral(obj) {
    return obj && typeof obj == 'object' && obj.provide;
}
exports.isProviderLiteral = isProviderLiteral;
function createProvider(obj) {
    return new provider_1.Provider(obj.provide, obj);
}
exports.createProvider = createProvider;
function isOpaqueToken(obj) {
    return obj instanceof opaque_token_1.OpaqueToken;
}
exports.isOpaqueToken = isOpaqueToken;
function isDirectiveLike(annotation) {
    return lang_1.isString(annotation.selector) && annotation instanceof metadata_directives_1.DirectiveMetadata;
}
exports.isDirectiveLike = isDirectiveLike;
function isDirective(annotation) {
    return isDirectiveLike(annotation) && !_hasTemplate(annotation);
}
exports.isDirective = isDirective;
function isComponent(annotation) {
    return lang_1.isString(annotation.selector) && _hasTemplate(annotation) && annotation instanceof metadata_directives_1.ComponentMetadata;
}
exports.isComponent = isComponent;
function _hasTemplate(annotation) {
    return lang_1.isPresent(annotation.template || annotation.templateUrl);
}
function isService(annotation) {
    return annotation instanceof metadata_2.InjectableMetadata;
}
exports.isService = isService;
function isPipe(annotation) {
    return lang_1.isString(annotation.name) && annotation instanceof metadata_1.PipeMetadata;
}
exports.isPipe = isPipe;
function isInjectMetadata(injectMeta) {
    return injectMeta instanceof metadata_2.InjectMetadata;
}
exports.isInjectMetadata = isInjectMetadata;
function isNgModule(annotation) {
    return annotation instanceof metadata_directives_1.NgModuleMetadata;
}
exports.isNgModule = isNgModule;
//# sourceMappingURL=provider_util.js.map