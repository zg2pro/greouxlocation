"use strict";
var directive_resolver_1 = require("../linker/directive_resolver");
var lang_1 = require("../../facade/lang");
var collections_1 = require("../../facade/collections");
var directive_lifecycles_reflector_1 = require("../linker/directive_lifecycles_reflector");
var directive_lifecycle_interfaces_1 = require("../linker/directive_lifecycle_interfaces");
var metadata_directives_1 = require("./metadata_directives");
var controller_factory_1 = require("./controller/controller_factory");
var children_resolver_1 = require("./query/children_resolver");
var host_parser_1 = require("./host/host_parser");
var host_resolver_1 = require("./host/host_resolver");
var directives_utils_1 = require("./directives_utils");
/**
 * @internal
 */
var DirectiveProvider = (function () {
    function DirectiveProvider(directiveResolver) {
        this.directiveResolver = directiveResolver;
    }
    /**
     * creates directiveName and DirectiveFactory for angularJS container
     *
     * it produces directive for classes decorated with @Directive with following DDO:
     * ```
     * {
     * require: ['directiveName'],
     * controller: ClassDirective,
     * link: postLinkFn
     * }
     * ```
     *
     * it produces component for classes decorated with @Component with following DDO:
     * ```
     * {
     * require: ['directiveName'],
     * controller: ClassDirective,
     * controllerAs: '$ctrl',
     * template: 'component template string',
     * scope:{},
     * bindToController:{},
     * transclude: false,
     * link: postLinkFn
     * }
     * ```
     * @param type
     * @returns {string|function(): ng.IDirective[]}
     */
    DirectiveProvider.prototype.createFromType = function (type) {
        var metadata = this.directiveResolver.resolve(type);
        var directiveName = lang_1.resolveDirectiveNameFromSelector(metadata.selector);
        var requireMap = this.directiveResolver.getRequiredDirectivesMap(type);
        var lfHooks = directive_lifecycles_reflector_1.resolveImplementedLifeCycleHooks(type);
        var _ddo = {
            restrict: 'A',
            controller: _controller,
            link: {
                pre: function () { _ddo._ngOnInitBound(); },
                post: this._createLink(type, metadata, lfHooks)
            },
            // @TODO this will be removed after @Query handling is moved to directiveControllerFactory
            require: this._createRequires(requireMap, directiveName),
            _ngOnInitBound: lang_1.noop
        };
        // Component controllers must be created from a factory. Checkout out
        // util/directive-controller.js for more information about what's going on here
        _controller.$inject = ['$scope', '$element', '$attrs', '$transclude', '$injector'];
        function _controller($scope, $element, $attrs, $transclude, $injector) {
            var locals = { $scope: $scope, $element: $element, $attrs: $attrs, $transclude: $transclude };
            return controller_factory_1.directiveControllerFactory(this, type, $injector, locals, requireMap, _ddo, metadata);
        }
        // specific DDO augmentation for @Component
        if (metadata instanceof metadata_directives_1.ComponentMetadata) {
            var assetsPath = this.directiveResolver.parseAssetUrl(metadata);
            var componentSpecificDDO = {
                restrict: 'E',
                scope: {},
                bindToController: {},
                controllerAs: DirectiveProvider._controllerAs,
                transclude: DirectiveProvider._transclude
            };
            if (metadata.template && metadata.templateUrl) {
                throw new Error('cannot have both template and templateUrl');
            }
            if (metadata.template) {
                componentSpecificDDO.template = metadata.template;
            }
            if (metadata.templateUrl) {
                componentSpecificDDO.templateUrl = "" + assetsPath + metadata.templateUrl;
            }
            collections_1.StringMapWrapper.assign(_ddo, componentSpecificDDO);
        }
        // allow compile defined as static method on Type
        if (lang_1.isFunction(type.compile)) {
            _ddo.compile = function compile(tElement, tAttrs) {
                var linkFn = type.compile(tElement, tAttrs);
                // if user custom compile fn returns link use that one instead use generated
                return lang_1.isJsObject(linkFn)
                    ? linkFn
                    : this.link;
            };
        }
        // allow link defined as static method on Type override the created one
        // you should not use this very often
        // Note: if you use this any @Host property decorators or lifeCycle hooks wont work
        if (lang_1.isFunction(type.link)) {
            _ddo.link = type.link;
        }
        // legacy property overrides all generated DDO stuff
        var ddo = this._createDDO(_ddo, metadata.legacy);
        function directiveFactory() { return ddo; }
        // ==========================
        // ngComponentRouter Support:
        // ==========================
        // @TODO(pete) remove the following `forEach` before we release 1.6.0
        // The component-router@0.2.0 looks for the annotations on the controller constructor
        // Nothing in Angular looks for annotations on the factory function but we can't remove
        // it from 1.5.x yet.
        // Copy any annotation properties (starting with $) over to the factory and controller constructor functions
        // These could be used by libraries such as the new component router
        collections_1.StringMapWrapper.forEach(ddo, function (val, key) {
            if (key.charAt(0) === '$') {
                directiveFactory[key] = val;
                // Don't try to copy over annotations to named controller
                if (lang_1.isFunction(ddo.controller)) {
                    ddo.controller[key] = val;
                }
            }
        });
        // support componentRouter $canActivate lc hook as static instead of defined within legacy object
        // componentRouter reads all lc hooks from directiveFactory ¯\_(ツ)_/¯
        // @TODO update this when new component router will be available for Angular 1 ( 1.6 release probably )
        if (lang_1.isFunction(type.$canActivate)) {
            directiveFactory.$canActivate = type.$canActivate;
        }
        return [directiveName, directiveFactory];
    };
    DirectiveProvider.prototype._createDDO = function (ddo, legacyDDO) {
        return lang_1.assign({}, DirectiveProvider._ddoShell, ddo, legacyDDO);
    };
    /**
     *
     * @param requireMap
     * @param directiveName
     * @returns {Array}
     * @private
     * @internal
     */
    DirectiveProvider.prototype._createRequires = function (requireMap, directiveName) {
        return [directiveName].concat(collections_1.StringMapWrapper.values(requireMap));
    };
    /**
     * Directive lifeCycles:
     * - ngOnInit from preLink (all children compiled and DOM ready)
     * - ngAfterContentInit from postLink ( DOM in children ready )
     * - ngOnDestroy from postLink
     *
     * Component lifeCycles:
     * - ngOnInit from preLink (controller require ready)
     * - ngAfterViewInit from postLink ( all children in view+content compiled and DOM ready )
     * - ngAfterContentInit from postLink ( same as ngAfterViewInit )
     * - ngOnDestroy from postLink
     * @param type
     * @param metadata
     * @param lfHooks
     * @private
     * @internal
     */
    DirectiveProvider.prototype._createLink = function (type, metadata, lfHooks) {
        if ((lfHooks.ngAfterContentChecked || lfHooks.ngAfterViewChecked) && collections_1.StringMapWrapper.size(metadata.queries) === 0) {
            throw new Error("\n              Hooks Impl for " + lang_1.stringify(type) + ":\n              ===================================\n              You've implement AfterContentChecked/AfterViewChecked lifecycle, but @ViewChild(ren)/@ContentChild(ren) decorators are not used.\n              we cannot invoke After(Content|View)Checked without provided @Query decorators\n              ");
        }
        if (metadata instanceof metadata_directives_1.ComponentMetadata) {
            if ((lfHooks.ngAfterContentInit || lfHooks.ngAfterContentChecked) && !collections_1.StringMapWrapper.getValueFromPath(metadata, 'legacy.transclude')) {
                throw new Error("\n              Hooks Impl for " + lang_1.stringify(type) + ":\n              ===================================\n              You cannot implement AfterContentInit lifecycle, without allowed transclusion.\n              turn transclusion on within decorator like this: @Component({legacy:{transclude:true}})\n              ");
            }
        }
        // we need to implement this if query are present on class, because during postLink _ngOnChildrenChanged is not yet
        // implemented on controller instance
        if (collections_1.StringMapWrapper.size(metadata.queries)) {
            type.prototype._ngOnChildrenChanged = lang_1.noop;
        }
        var hostProcessed = host_parser_1._parseHost(metadata.host);
        return postLink;
        function postLink(scope, element, attrs, controller, transclude) {
            var _watchers = [];
            var ctrl = controller[0], requiredCtrls = controller.slice(1);
            host_resolver_1._setHostStaticAttributes(element, hostProcessed.hostStatic);
            // setup @HostBindings
            _watchers.push.apply(_watchers, host_resolver_1._setHostBindings(scope, element, ctrl, hostProcessed.hostBindings));
            // setup @HostListeners
            host_resolver_1._setHostListeners(scope, element, ctrl, hostProcessed.hostListeners);
            // @ContentChild/@ContentChildren/@ViewChild/@ViewChildren related logic
            var parentCheckedNotifiers = children_resolver_1._getParentCheckNotifiers(ctrl, requiredCtrls);
            _watchers.push.apply(_watchers, parentCheckedNotifiers);
            children_resolver_1._setupQuery(scope, element, ctrl, metadata.queries);
            // AfterContentInit/AfterViewInit Hooks
            // if there are query defined schedule $evalAsync semaphore
            if (collections_1.StringMapWrapper.size(metadata.queries)) {
                ctrl._ngOnChildrenChanged(directive_lifecycle_interfaces_1.ChildrenChangeHook.FromView, [
                    parentCheckedNotifiers.forEach(function (cb) { return cb(); }),
                    ctrl.ngAfterViewInit && ctrl.ngAfterViewInit.bind(ctrl),
                    ctrl.ngAfterViewChecked && ctrl.ngAfterViewChecked.bind(ctrl),
                ]);
                ctrl._ngOnChildrenChanged(directive_lifecycle_interfaces_1.ChildrenChangeHook.FromContent, [
                    parentCheckedNotifiers.forEach(function (cb) { return cb(); }),
                    ctrl.ngAfterContentInit && ctrl.ngAfterContentInit.bind(ctrl),
                    ctrl.ngAfterContentChecked && ctrl.ngAfterContentChecked.bind(ctrl),
                ]);
            }
            else {
                // no @ContentChild/@ViewChild(ref) decorators exist, call just controller init method
                parentCheckedNotifiers.forEach(function (cb) { return cb(); });
                ctrl.ngAfterViewInit && ctrl.ngAfterViewInit();
                ctrl.ngAfterContentInit && ctrl.ngAfterContentInit();
            }
            directives_utils_1._setupDestroyHandler(scope, element, ctrl, lfHooks.ngOnDestroy, _watchers);
        }
    };
    return DirectiveProvider;
}());
DirectiveProvider._ddoShell = {
    require: [],
    controller: lang_1.noop,
    link: { pre: lang_1.noop, post: lang_1.noop }
};
DirectiveProvider._controllerAs = "$ctrl";
DirectiveProvider._transclude = false;
exports.DirectiveProvider = DirectiveProvider;
exports.directiveProvider = new DirectiveProvider(new directive_resolver_1.DirectiveResolver());
//# sourceMappingURL=directive_provider.js.map