"use strict";
var lang_1 = require("../../../facade/lang");
var collections_1 = require("../../../facade/collections");
var primitives_1 = require("../../../facade/primitives");
/**
 *
 * @param element
 * @param staticAttributes
 * @private
 */
function _setHostStaticAttributes(element, staticAttributes) {
    element.attr(staticAttributes);
}
exports._setHostStaticAttributes = _setHostStaticAttributes;
/**
 *
 * @param scope
 * @param element
 * @param ctrl
 * @param hostBindings
 * @returns {Array}
 * @internal
 * @private
 */
function _setHostBindings(scope, element, ctrl, hostBindings) {
    // setup @HostBindings
    return _createWatcherByType('classes', hostBindings).concat(_createWatcherByType('attributes', hostBindings), _createWatcherByType('properties', hostBindings));
    /**
     * registers $scope.$watch for appropriate hostBinding
     * the watcher watches property on controller instance
     * @param type
     * @param hostBinding
     * @returns {Array}
     * @private
     */
    function _createWatcherByType(type, hostBinding) {
        var _watchersByType = [];
        collections_1.StringMapWrapper.forEach(hostBinding[type], function (watchPropName, keyToSet) {
            _watchersByType.push(scope.$watch(function () { return ctrl[watchPropName]; }, function (newValue) {
                if (type === 'classes') {
                    element.toggleClass(keyToSet, newValue);
                }
                if (type === 'attributes') {
                    element.attr(keyToSet, newValue);
                }
                if (type === 'properties') {
                    collections_1.StringMapWrapper.setValueInPath(element[0], keyToSet, newValue);
                }
            }));
        });
        return _watchersByType;
    }
}
exports._setHostBindings = _setHostBindings;
/**
 *
 * @param scope
 * @param element
 * @param ctrl
 * @param hostListeners
 * @internal
 * @private
 */
function _setHostListeners(scope, element, ctrl, hostListeners) {
    collections_1.StringMapWrapper.forEach(hostListeners, _registerHostListener);
    function _registerHostListener(cbArray, eventKey) {
        var methodName = cbArray[0], methodParams = cbArray.slice(1);
        var _a = _getTargetAndEvent(eventKey, element), event = _a.event, target = _a.target;
        // console.log( event );
        target.on(event, eventHandler);
        // global event
        if (target !== element) {
            scope.$on('$destroy', function () { return target.off(event, eventHandler); });
        }
        function eventHandler(evt) {
            var cbParams = _getHostListenerCbParams(evt, methodParams);
            scope.$apply(function () {
                var noPreventDefault = ctrl[methodName].apply(ctrl, cbParams);
                // HostListener event.preventDefault if method returns false
                if (noPreventDefault === false) {
                    evt.preventDefault();
                }
            });
        }
    }
}
exports._setHostListeners = _setHostListeners;
/**
 * return $event or it's property if found via path
 * @param event
 * @param eventParams
 * @returns {Array}
 * @private
 */
function _getHostListenerCbParams(event, eventParams) {
    var ALLOWED_EVENT_NAME = '$event';
    return eventParams.reduce(function (acc, eventPath) {
        if (!primitives_1.StringWrapper.startsWith(eventPath, ALLOWED_EVENT_NAME)) {
            throw new Error("\n              only $event.* is supported. Please provide correct listener parameter @example: $event,$event.target\n              ");
        }
        if (eventPath === ALLOWED_EVENT_NAME) {
            return acc.concat([event]);
        }
        return acc.concat([collections_1.StringMapWrapper.getValueFromPath(event, eventPath.replace(ALLOWED_EVENT_NAME, ''))]);
    }, []);
}
exports._getHostListenerCbParams = _getHostListenerCbParams;
function _getGlobalTargetReference($injector, targetName) {
    var globalEventTargets = ['document', 'window', 'body'];
    var $document = $injector.get("$document");
    if (targetName === 'document') {
        return $document;
    }
    if (targetName === 'window') {
        return lang_1.global.angular.element($injector.get("$" + targetName));
    }
    if (targetName === 'body') {
        return lang_1.global.angular.element($document[0][targetName]);
    }
    throw new Error("unsupported global target '" + targetName + "', only '" + globalEventTargets + "' are supported");
}
/**
 *
 * @param definedHostEvent this will be just simple 'event' string name or 'globalTarget:event'
 * @param hostElement
 * @returns {any}
 * @private
 */
function _getTargetAndEvent(definedHostEvent, hostElement) {
    // global target
    var eventWithGlobalTarget = definedHostEvent.split(/\s*:\s*/);
    if (eventWithGlobalTarget.length === 2) {
        var globalTarget = eventWithGlobalTarget[0], eventOnTarget = eventWithGlobalTarget[1];
        return {
            event: eventOnTarget,
            target: _getGlobalTargetReference(hostElement.injector(), globalTarget)
        };
    }
    return {
        event: definedHostEvent,
        target: hostElement
    };
}
//# sourceMappingURL=host_resolver.js.map