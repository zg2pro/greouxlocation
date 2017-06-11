"use strict";
var lang_1 = require("../../../facade/lang");
var collections_1 = require("../../../facade/collections");
var directive_lifecycle_interfaces_1 = require("../../linker/directive_lifecycle_interfaces");
var reflection_1 = require("../../reflection/reflection");
var provider_1 = require("../../di/provider");
var metadata_directives_1 = require("../metadata_directives");
var metadata_di_1 = require("../metadata_di");
/**
 * setup watchers for children component/directives provided by @Query decorators
 * - setup @ContentChild/@ContentChildren/@ViewChild/@ViewChildren
 * @param scope
 * @param element
 * @param ctrl
 * @param queries
 * @private
 */
function _setupQuery(scope, element, ctrl, queries) {
    var SEMAPHORE_PROP_NAMES = Object.freeze({
        view: '__readViewChildrenOrderScheduled',
        content: '__readContentChildrenOrderScheduled'
    });
    var DOM_RESOLVER_TYPES = Object.freeze({
        view: 'view',
        content: 'content'
    });
    if (collections_1.StringMapWrapper.size(queries) === 0) {
        return;
    }
    var onChildrenChangedCb = _getOnChildrenResolvers(element, ctrl, queries);
    ctrl.__readContentChildrenOrderScheduled = false;
    ctrl.__readViewChildrenOrderScheduled = false;
    // this is our created _ngOnChildrenChanged which will be called by children directives
    var _ngOnChildrenChanged = function (type, onFirstChangeDoneCb, domResolverCb) {
        if (onFirstChangeDoneCb === void 0) { onFirstChangeDoneCb = []; }
        if (domResolverCb === void 0) { domResolverCb = onChildrenChangedCb; }
        var orderScheduledSemaphorePropName = '';
        var domResolverCbType = '';
        if (type === directive_lifecycle_interfaces_1.ChildrenChangeHook.FromView) {
            orderScheduledSemaphorePropName = SEMAPHORE_PROP_NAMES.view;
            domResolverCbType = DOM_RESOLVER_TYPES.view;
        }
        else if (type === directive_lifecycle_interfaces_1.ChildrenChangeHook.FromContent) {
            domResolverCbType = DOM_RESOLVER_TYPES.content;
            orderScheduledSemaphorePropName = SEMAPHORE_PROP_NAMES.content;
        }
        else {
            throw new Error("_ngOnChildrenChanged: queryType(" + type + ") must be one of FromView|FromContent");
        }
        if (ctrl[orderScheduledSemaphorePropName]) {
            return;
        }
        ctrl[orderScheduledSemaphorePropName] = true;
        // we execute callback within $evalAsync to extend $digest loop count, which will not trigger another
        // $rootScope.$digest === #perfmatters
        scope.$evalAsync(function () {
            // turn semaphore On back again
            ctrl[orderScheduledSemaphorePropName] = false;
            // query DOM and assign instances/jqLite to controller properties
            domResolverCb[domResolverCbType].forEach(function (cb) { return cb(); });
            // when DOM is queried we can execute DirectiveComponent life cycles which have been registered
            // AfterViewInit | AfterContentInit
            onFirstChangeDoneCb.forEach(function (cb) { lang_1.isFunction(cb) && cb(); });
        });
    };
    // this method needs to be called from children which are we querying
    // if they are rendered dynamically/async
    ctrl._ngOnChildrenChanged = _ngOnChildrenChanged.bind(ctrl);
    /**
     * get all callbacks which will be executed withing $scope.$evalAsync,
     * which are querying for DOM elements and gets controller instances from host element children
     * @param element
     * @param ctrl
     * @param queries
     * @returns {view: Function[], content: Function[]}
     * @private
     */
    function _getOnChildrenResolvers(element, ctrl, queries) {
        var _onChildrenChangedCbMap = (_a = {},
            _a[DOM_RESOLVER_TYPES.view] = [],
            _a[DOM_RESOLVER_TYPES.content] = [],
            _a);
        collections_1.StringMapWrapper.forEach(queries, function (meta, key) {
            if (meta instanceof metadata_di_1.ViewChildMetadata) {
                _onChildrenChangedCbMap[DOM_RESOLVER_TYPES.view].push(_resolveViewChild(element, ctrl, key, meta));
            }
            if (meta instanceof metadata_di_1.ViewChildrenMetadata) {
                _onChildrenChangedCbMap[DOM_RESOLVER_TYPES.view].push(_resolveViewChildren(element, ctrl, key, meta));
            }
            if (meta instanceof metadata_di_1.ContentChildMetadata) {
                _onChildrenChangedCbMap[DOM_RESOLVER_TYPES.content].push(_resolveContentChild(element, ctrl, key, meta));
            }
            if (meta instanceof metadata_di_1.ContentChildrenMetadata) {
                _onChildrenChangedCbMap[DOM_RESOLVER_TYPES.content].push(_resolveContentChildren(element, ctrl, key, meta));
            }
        });
        return _onChildrenChangedCbMap;
        function _resolveViewChild(element, ctrl, key, meta) {
            return _resolveChildrenFactory(element, ctrl, key, meta.selector, DOM_RESOLVER_TYPES.view, true);
        }
        function _resolveContentChild(element, ctrl, key, meta) {
            return _resolveChildrenFactory(element, ctrl, key, meta.selector, DOM_RESOLVER_TYPES.content, true);
        }
        function _resolveViewChildren(element, ctrl, key, meta) {
            return _resolveChildrenFactory(element, ctrl, key, meta.selector, DOM_RESOLVER_TYPES.view);
        }
        function _resolveContentChildren(element, ctrl, key, meta) {
            return _resolveChildrenFactory(element, ctrl, key, meta.selector, DOM_RESOLVER_TYPES.content);
        }
        var _a;
    }
}
exports._setupQuery = _setupQuery;
/**
 * resolving DOM instances by provided @ContentChild(ref)/@ViewChild(ref)
 * - if querying for string, we handle it as a selector and return jqLite instances
 * - if querying for Type( directive | component ) we get proper selector and controller from
 * provided Type reference, query the DOM and return that controller instance if exists, otherwise null
 * @param element
 * @param ctrl
 * @param key
 * @param cssSelector
 * @param type
 * @param firstOnly
 * @returns {function(): void}
 * @private
 */
function _resolveChildrenFactory(element, ctrl, key, cssSelector, type, firstOnly) {
    if (firstOnly === void 0) { firstOnly = false; }
    var _a = _getSelectorAndCtrlName(cssSelector), selector = _a.selector, childCtrlName = _a.childCtrlName;
    return _childResolver;
    function _childResolver() {
        if (firstOnly) {
            ctrl[key] = null;
            var child = _getChildElements(element, selector, type, firstOnly);
            var childInstance = lang_1.isString(cssSelector)
                ? child
                : getControllerOnElement(child, childCtrlName);
            ctrl[key] = childInstance;
        }
        else {
            ctrl[key] = [];
            var children = _getChildElements(element, selector, type);
            if (lang_1.isString(cssSelector)) {
                ctrl[key] = children;
                return;
            }
            for (var i = 0; i < children.length; i++) {
                ctrl[key].push(getControllerOnElement(children.eq(i), childCtrlName));
            }
        }
    }
}
exports._resolveChildrenFactory = _resolveChildrenFactory;
/**
 * query View/Content DOM for particular child elements/attributes selector
 * @param $element
 * @param selector
 * @param type
 * @param firstOnly
 * @returns {IAugmentedJQuery}
 * @private
 */
function _getChildElements($element, selector, type, firstOnly) {
    if (firstOnly === void 0) { firstOnly = false; }
    var querySelector = '';
    if (type === 'view') {
        // Note: we are guarding only for first nested child inside ng-transclude
        // this would be to complicated and DOM heavy to select only selectors outside ng-transclude
        // - it should be author responsibility to not include Component view directive within <ng-transclude> and querying for them
        querySelector = ":not(ng-transclude):not([ng-transclude]) > " + selector;
    }
    if (type === 'content') {
        querySelector = "ng-transclude " + selector + ", [ng-transclude] " + selector;
    }
    var queryMethod = firstOnly
        ? 'querySelector'
        : 'querySelectorAll';
    return lang_1.global.angular.element($element[0][queryMethod](querySelector));
}
exports._getChildElements = _getChildElements;
function _getSelectorAndCtrlName(childSelector) {
    var selector = _getSelector(childSelector);
    var childCtrlName = provider_1.getInjectableName(childSelector);
    return { selector: selector, childCtrlName: childCtrlName };
}
exports._getSelectorAndCtrlName = _getSelectorAndCtrlName;
/**
 * get CSS selector from Component/Directive decorated class metadata
 * @param selector
 * @returns {string}
 * @private
 */
function _getSelector(selector) {
    if (lang_1.isString(selector)) {
        return selector;
    }
    if (lang_1.isType(selector)) {
        var annotation = reflection_1.reflector.annotations(selector)[0];
        if (annotation instanceof metadata_directives_1.DirectiveMetadata) {
            return annotation.selector;
        }
    }
    throw new Error("cannot query for non Directive/Component type " + lang_1.getFuncName(selector));
}
exports._getSelector = _getSelector;
/**
 * creates functions which will be called from parent component which is querying this component
 * - component which queries needs to be injected to child,
 * here child creates special callbacks by type of @Query which will be called from postLink and on scope destroy so
 * we clean up GC
 * @param ctrl
 * @param requiredCtrls
 * @returns {Object|Array|T|function()[]}
 * @private
 */
function _getParentCheckNotifiers(ctrl, requiredCtrls) {
    var parentCheckedNotifiers = requiredCtrls.reduce(function (acc, requiredCtrl) {
        if (!lang_1.isJsObject(requiredCtrl)) {
            return acc;
        }
        var Ctor = requiredCtrl.constructor;
        if (!lang_1.isType(Ctor)) {
            return acc;
        }
        var propMeta = reflection_1.reflector.propMetadata(Ctor);
        if (!collections_1.StringMapWrapper.size(propMeta)) {
            return acc;
        }
        var _parentCheckedNotifiers = [];
        collections_1.StringMapWrapper.forEach(propMeta, function (propMetaPropArr) {
            propMetaPropArr
                .filter(function (propMetaInstance) {
                // check if propMeta is one of @Query types and that it queries for Directive/Component ( typeof selector == function )
                if (!((propMetaInstance instanceof metadata_di_1.QueryMetadata) && lang_1.isType(propMetaInstance.selector))) {
                    return false;
                }
                // check if current child is really queried from its parent
                return ctrl instanceof propMetaInstance.selector;
            })
                .forEach(function (propMetaInstance) {
                // parent queried for this child with one from @ContentChild/@ContentChildren
                if (!propMetaInstance.isViewQuery) {
                    _parentCheckedNotifiers.push(function () { return requiredCtrl._ngOnChildrenChanged(directive_lifecycle_interfaces_1.ChildrenChangeHook.FromContent, [requiredCtrl.ngAfterContentChecked.bind(requiredCtrl)]); });
                }
                // parent queried for this child with one from @ViewChild/@ViewChildren
                if (propMetaInstance.isViewQuery) {
                    _parentCheckedNotifiers.push(function () { return requiredCtrl._ngOnChildrenChanged(directive_lifecycle_interfaces_1.ChildrenChangeHook.FromView, [requiredCtrl.ngAfterViewChecked.bind(requiredCtrl)]); });
                }
            });
        });
        return acc.concat(_parentCheckedNotifiers);
    }, []);
    return collections_1.ListWrapper.size(parentCheckedNotifiers)
        ? parentCheckedNotifiers
        : [lang_1.noop];
}
exports._getParentCheckNotifiers = _getParentCheckNotifiers;
function getControllerOnElement($element, ctrlName) {
    if (!$element) {
        return null;
    }
    return $element.controller(ctrlName);
}
exports.getControllerOnElement = getControllerOnElement;
//# sourceMappingURL=children_resolver.js.map