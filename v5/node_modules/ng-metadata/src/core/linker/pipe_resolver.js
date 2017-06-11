"use strict";
var lang_1 = require("../../facade/lang");
var collections_1 = require("../../facade/collections");
var metadata_1 = require("../pipes/metadata");
var reflection_1 = require("../reflection/reflection");
var forward_ref_1 = require("../di/forward_ref");
function _isPipeMetadata(type) {
    return type instanceof metadata_1.PipeMetadata;
}
/**
 * Resolve a `Type` for {@link PipeMetadata}.
 *
 */
var PipeResolver = (function () {
    function PipeResolver() {
    }
    /**
     * Return {@link PipeMetadata} for a given `Type`.
     */
    PipeResolver.prototype.resolve = function (type) {
        var metas = reflection_1.reflector.annotations(forward_ref_1.resolveForwardRef(type));
        if (lang_1.isPresent(metas)) {
            var annotation = collections_1.ListWrapper.find(metas, _isPipeMetadata);
            if (lang_1.isPresent(annotation)) {
                return annotation;
            }
        }
        throw new Error("No Pipe decorator found on " + lang_1.stringify(type));
    };
    return PipeResolver;
}());
exports.PipeResolver = PipeResolver;
//# sourceMappingURL=pipe_resolver.js.map