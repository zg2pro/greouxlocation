"use strict";
var lang_1 = require("../../facade/lang");
var pipe_resolver_1 = require("../linker/pipe_resolver");
/**
 * @internal
 */
var PipeProvider = (function () {
    function PipeProvider(pipeResolver) {
        this.pipeResolver = pipeResolver;
    }
    PipeProvider.prototype.createFromType = function (type) {
        var metadata = this.pipeResolver.resolve(type);
        if (!lang_1.isFunction(type.prototype.transform)) {
            throw new Error("@Pipe: must implement '#transform' method");
        }
        filterFactory.$inject = ['$injector'];
        function filterFactory($injector) {
            var pipeInstance = $injector.instantiate(type);
            // return angular 1 filter function
            var filterFn = pipeInstance.transform.bind(pipeInstance);
            if (metadata.pure === false) {
                filterFn.$stateful = true;
            }
            return filterFn;
        }
        return [
            metadata.name,
            filterFactory
        ];
    };
    return PipeProvider;
}());
exports.PipeProvider = PipeProvider;
/** @internal */
exports.pipeProvider = new PipeProvider(new pipe_resolver_1.PipeResolver());
//# sourceMappingURL=pipe_provider.js.map