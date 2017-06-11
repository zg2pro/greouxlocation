"use strict";
var lang_1 = require("../../../facade/lang");
var collections_1 = require("../../../facade/collections");
var HOST_BINDING_KEY_REGEX = /^\[.*\]$/;
var HOST_LISTENER_KEY_REGEX = /^\(.*\)$/;
var HAS_CLASS_REGEX = /^class./;
var HAS_ATTR_REGEX = /^attr./;
function _parseHost(host) {
    if (!lang_1.isPresent(host)) {
        return;
    }
    var hostStatic = {};
    var hostBindingsRaw = [];
    var hostListeners = {};
    collections_1.StringMapWrapper.forEach(host, function (hostValue, hostKey) {
        var hostMap = (_a = {}, _a[stripBindingOrListenerBrackets(hostKey)] = hostValue, _a);
        if (isStaticHost(hostKey)) {
            lang_1.assign(hostStatic, hostMap);
            return;
        }
        if (isHostBinding(hostKey)) {
            hostBindingsRaw.push(hostMap);
            return;
        }
        if (isHostListener(hostKey)) {
            lang_1.assign(hostListeners, processHostListenerCallback(hostMap));
        }
        var _a;
    });
    var hostBindings = hostBindingsRaw
        .reduce(function (acc, hostBindingObj) {
        var hostObjKey = Object.keys(hostBindingObj)[0];
        var hostObjValue = hostBindingObj[hostObjKey];
        if (HAS_CLASS_REGEX.test(hostObjKey)) {
            acc.classes[hostObjKey.replace(HAS_CLASS_REGEX, '')] = hostObjValue;
            return acc;
        }
        if (HAS_ATTR_REGEX.test(hostObjKey)) {
            acc.attributes[hostObjKey.replace(HAS_ATTR_REGEX, '')] = hostObjValue;
            return acc;
        }
        lang_1.assign(acc.properties, hostBindingObj);
        return acc;
    }, {
        classes: {},
        attributes: {},
        properties: {}
    });
    return {
        hostStatic: hostStatic,
        hostBindings: hostBindings,
        hostListeners: hostListeners
    };
    function isHostBinding(hostKey) {
        return HOST_BINDING_KEY_REGEX.test(hostKey);
    }
    function isHostListener(hostKey) {
        return HOST_LISTENER_KEY_REGEX.test(hostKey);
    }
    function isStaticHost(hostKey) {
        return !(isHostBinding(hostKey) || isHostListener(hostKey));
    }
    function stripBindingOrListenerBrackets(hostKey) {
        return hostKey.replace(/\[|\]|\(|\)/g, '');
    }
    function processHostListenerCallback(hostListener) {
        // eventKey is 'click' or 'document: click' etc
        var eventKey = Object.keys(hostListener)[0];
        // cbString is just value 'onMove($event.target)' or 'onMove()'
        var cbString = hostListener[eventKey];
        // here we parse out callback method and its argument to separate strings
        // - for instance we got from 'onMove($event.target)' --> 'onMove','$event.target'
        var _a = /^(\w+)\(([$\w.\s,]*)\)$/.exec(cbString), cbMethodName = _a[1], cbMethodArgs = _a[2];
        var eventValue = [
            cbMethodName
        ].concat(cbMethodArgs.split(',').filter(function (argument) { return Boolean(argument); }).map(function (argument) { return argument.trim(); }));
        return _b = {},
            _b[eventKey.replace(/\s/g, '')] = eventValue,
            _b;
        var _b;
    }
}
exports._parseHost = _parseHost;
//# sourceMappingURL=host_parser.js.map