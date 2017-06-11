"use strict";
var directives_utils_1 = require("../directives_utils");
var change_detection_util_1 = require("../../change_detection/change_detection_util");
var changes_queue_1 = require("../../change_detection/changes_queue");
var collections_1 = require("../../../facade/collections");
var lang_1 = require("../../../facade/lang");
var async_1 = require("../../../facade/async");
var constants_1 = require("./constants");
var binding_parser_1 = require("./binding_parser");
/**
 * Create Bindings manually for both Directive/Component
 * @returns {{watchers: Array, observers: Array}}
 * @internal
 * @private
 */
function _createDirectiveBindings(hasIsolateScope, ngScope, ngAttrs, ctrl, metadata, _a) {
    /*  let BOOLEAN_ATTR = {};
     'multiple,selected,checked,disabled,readOnly,required,open'
     .split(',')
     .forEach(function(value) {
     BOOLEAN_ATTR[value.toLocaleLowerCase()] = value;
     });*/
    var $interpolate = _a.$interpolate, $parse = _a.$parse, $rootScope = _a.$rootScope;
    var isBindingImmutable = directives_utils_1.isComponentDirective(metadata) && change_detection_util_1.ChangeDetectionUtil.isOnPushChangeDetectionStrategy(metadata.changeDetection);
    var scope = hasIsolateScope
        ? ngScope.$parent
        : ngScope;
    var _b = metadata.inputs, inputs = _b === void 0 ? [] : _b, _c = metadata.outputs, outputs = _c === void 0 ? [] : _c;
    var parsedBindings = binding_parser_1.setupFields(ngAttrs, inputs, outputs);
    var _internalWatchers = [];
    var _internalObservers = [];
    // onChanges tmp vars
    var initialChanges = {};
    var changes;
    // this will create flush queue internally only once
    // we need to call this here because we need $rootScope service
    changes_queue_1.changesQueueService.buildFlushOnChanges($rootScope);
    // setup @Inputs '<' or '='
    collections_1.StringMapWrapper.forEach(parsedBindings.inputs, function (config, propName) {
        var exp = config.exp, attrName = config.attrName, mode = config.mode;
        // support for TWO_WAY only for components
        var hasTwoWayBinding = hasIsolateScope && mode === constants_1.BINDING_MODE.twoWay;
        var removeWatch = hasTwoWayBinding
            ? _createTwoWayBinding(propName, attrName, exp)
            : _createOneWayBinding(propName, attrName, exp, isBindingImmutable);
        _internalWatchers.push(removeWatch);
    });
    // setup @Input('@')
    collections_1.StringMapWrapper.forEach(parsedBindings.attrs, function (config, propName) {
        var attrName = config.attrName, exp = config.exp, mode = config.mode;
        var removeObserver = _createAttrBinding(propName, attrName, exp);
        _internalObservers.push(removeObserver);
    });
    // setup @Outputs
    collections_1.StringMapWrapper.forEach(parsedBindings.outputs, function (config, propName) {
        var exp = config.exp, attrName = config.attrName, mode = config.mode;
        _createOutputBinding(propName, attrName, exp);
    });
    function _createOneWayBinding(propName, attrName, exp, isImmutable) {
        if (isImmutable === void 0) { isImmutable = false; }
        if (!exp)
            return;
        var parentGet = $parse(exp);
        var initialValue = ctrl[propName] = parentGet(scope);
        initialChanges[propName] = change_detection_util_1.ChangeDetectionUtil.simpleChange(change_detection_util_1.ChangeDetectionUtil.uninitialized, ctrl[propName]);
        return scope.$watch(parentGet, function parentValueWatchAction(newValue, oldValue) {
            // https://github.com/angular/angular.js/commit/d9448dcb9f901ceb04deda1d5f3d5aac8442a718
            // https://github.com/angular/angular.js/commit/304796471292f9805b9cf77e51aacc9cfbb09921
            if (oldValue === newValue) {
                if (oldValue === initialValue)
                    return;
                oldValue = initialValue;
            }
            recordChanges(propName, newValue, oldValue);
            ctrl[propName] = isImmutable ? lang_1.global.angular.copy(newValue) : newValue;
        }, parentGet.literal);
    }
    function _createTwoWayBinding(propName, attrName, exp) {
        if (!exp)
            return;
        var lastValue;
        var parentGet = $parse(exp);
        var parentSet = parentGet.assign || function () {
            // reset the change, or we will throw this exception on every $digest
            lastValue = ctrl[propName] = parentGet(scope);
            throw new Error("nonassign,\n          Expression '" + ngAttrs[attrName] + "' in attribute '" + attrName + "' used with directive '{2}' is non-assignable!");
        };
        var compare = parentGet.literal ? lang_1.global.angular.equals : simpleCompare;
        var parentValueWatch = function parentValueWatch(parentValue) {
            if (!compare(parentValue, ctrl[propName])) {
                // we are out of sync and need to copy
                if (!compare(parentValue, lastValue)) {
                    // parent changed and it has precedence
                    ctrl[propName] = parentValue;
                }
                else {
                    // if the parent can be assigned then do so
                    parentSet(scope, parentValue = ctrl[propName]);
                }
            }
            return lastValue = parentValue;
        };
        parentValueWatch.$stateful = true;
        lastValue = ctrl[propName] = parentGet(scope);
        // NOTE: we don't support collection watch, it's not good for performance
        // if (definition.collection) {
        //   removeWatch = scope.$watchCollection(attributes[attrName], parentValueWatch);
        // } else {
        //   removeWatch = scope.$watch($parse(attributes[attrName], parentValueWatch), null, parentGet.literal);
        // }
        // removeWatchCollection.push(removeWatch);
        return scope.$watch(
        // $parse( ngAttrs[ attrName ], parentValueWatch ),
        $parse(exp, parentValueWatch), null, parentGet.literal);
        function simpleCompare(a, b) { return a === b || (a !== a && b !== b); }
    }
    function _createOutputBinding(propName, attrName, exp) {
        // Don't assign Object.prototype method to scope
        var parentGet = exp
            ? $parse(exp)
            : lang_1.noop;
        // Don't assign noop to ctrl if expression is not valid
        if (parentGet === lang_1.noop)
            return;
        // here we assign property to EventEmitter instance directly
        var emitter = new async_1.EventEmitter();
        emitter.wrapNgExpBindingToEmitter(function _exprBindingCb(locals) {
            return parentGet(scope, locals);
        });
        ctrl[propName] = emitter;
    }
    function _createAttrBinding(propName, attrName, exp) {
        var lastValue = exp;
        // register watchers for further changes
        // The observer function will be invoked once during the next $digest following compilation.
        // The observer is then invoked whenever the interpolated value changes.
        var _disposeObserver = ngAttrs.$observe(attrName, function (value) {
            // https://github.com/angular/angular.js/commit/499e1b2adf27f32d671123f8dceadb3df2ad84a9
            if (lang_1.isString(value) || lang_1.isBoolean(value)) {
                var oldValue = ctrl[propName];
                recordChanges(propName, value, oldValue);
                ctrl[propName] = value;
            }
        });
        ngAttrs.$$observers[attrName].$$scope = scope;
        if (lang_1.isString(lastValue)) {
            // If the attribute has been provided then we trigger an interpolation to ensure
            // the value is there for use in the link fn
            ctrl[propName] = $interpolate(lastValue)(scope);
        }
        else if (lang_1.isBoolean(lastValue)) {
            // If the attributes is one of the BOOLEAN_ATTR then Angular will have converted
            // the value to boolean rather than a string, so we special case this situation
            ctrl[propName] = lastValue;
        }
        initialChanges[propName] = change_detection_util_1.ChangeDetectionUtil.simpleChange(change_detection_util_1.ChangeDetectionUtil.uninitialized, ctrl[propName]);
        return _disposeObserver;
    }
    function recordChanges(key, currentValue, previousValue) {
        if (lang_1.isFunction(ctrl.ngOnChanges) && currentValue !== previousValue) {
            // If we have not already scheduled the top level onChangesQueue handler then do so now
            if (!changes_queue_1.changesQueueService.onChangesQueue) {
                scope.$$postDigest(changes_queue_1.changesQueueService.flushOnChangesQueue);
                changes_queue_1.changesQueueService.onChangesQueue = [];
            }
            // If we have not already queued a trigger of onChanges for this controller then do so now
            if (!changes) {
                changes = {};
                changes_queue_1.changesQueueService.onChangesQueue.push(triggerOnChangesHook);
            }
            // If the has been a change on this property already then we need to reuse the previous value
            if (changes[key]) {
                previousValue = changes[key].previousValue;
            }
            // Store this change
            changes[key] = change_detection_util_1.ChangeDetectionUtil.simpleChange(previousValue, currentValue);
        }
    }
    function triggerOnChangesHook() {
        ctrl.ngOnChanges(changes);
        // Now clear the changes so that we schedule onChanges when more changes arrive
        changes = undefined;
    }
    function removeWatches() {
        var removeWatchCollection = _internalWatchers.concat(_internalObservers);
        for (var i = 0, ii = removeWatchCollection.length; i < ii; ++i) {
            if (removeWatchCollection[i] && lang_1.isFunction(removeWatchCollection[i])) {
                removeWatchCollection[i]();
            }
        }
    }
    return {
        initialChanges: initialChanges,
        removeWatches: removeWatches,
        _watchers: { watchers: _internalWatchers, observers: _internalObservers }
    };
}
exports._createDirectiveBindings = _createDirectiveBindings;
//# sourceMappingURL=binding_factory.js.map