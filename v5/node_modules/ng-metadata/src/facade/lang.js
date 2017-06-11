"use strict";
var globalScope;
if (typeof window === 'undefined') {
    globalScope = global;
}
else {
    globalScope = window;
}
// Need to declare a new variable for global here since TypeScript
// exports the original value of the symbol.
var _global = globalScope;
exports.global = _global;
// ===============
// implementations
// ===============
/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;
/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;
/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;
var argsTag = '[object Arguments]';
var _devMode = true;
/**
 * Disable Angular's development mode, which turns off assertions and other
 * checks within the framework.
 *
 * One important assertion this disables verifies that a change detection pass
 * does not result in additional changes to any bindings (also known as
 * unidirectional data flow).
 */
function enableProdMode() {
    _devMode = false;
}
exports.enableProdMode = enableProdMode;
function assertionsEnabled() {
    return _devMode;
}
exports.assertionsEnabled = assertionsEnabled;
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
exports.isPresent = isPresent;
function isBlank(obj) {
    return obj === undefined || obj === null;
}
exports.isBlank = isBlank;
function isString(obj) {
    return typeof obj === "string";
}
exports.isString = isString;
function isFunction(obj) {
    return typeof obj === "function";
}
exports.isFunction = isFunction;
function isBoolean(obj) {
    return typeof obj === "boolean";
}
exports.isBoolean = isBoolean;
function isArray(obj) {
    return Array.isArray(obj);
}
exports.isArray = isArray;
function isNumber(obj) {
    return typeof obj === 'number';
}
exports.isNumber = isNumber;
function isDate(obj) {
    return obj instanceof Date && !isNaN(obj.valueOf());
}
exports.isDate = isDate;
function isType(obj) {
    return isFunction(obj);
}
exports.isType = isType;
function isStringMap(obj) {
    return typeof obj === 'object' && obj !== null;
}
exports.isStringMap = isStringMap;
function isPromise(obj) {
    return obj instanceof _global.Promise;
}
exports.isPromise = isPromise;
function isPromiseLike(obj) {
    return Boolean(isPresent(obj) && obj.then);
}
exports.isPromiseLike = isPromiseLike;
function isObservable(obj) {
    return Boolean(isPresent(obj) && obj.subscribe);
}
exports.isObservable = isObservable;
function isPromiseOrObservable(obj) {
    return isPromiseLike(obj) || isObservable(obj);
}
exports.isPromiseOrObservable = isPromiseOrObservable;
function isScope(obj) {
    return isPresent(obj) && obj.$digest && obj.$on;
}
exports.isScope = isScope;
function isSubscription(obj) {
    return isPresent(obj) && obj.unsubscribe;
}
exports.isSubscription = isSubscription;
function isJsObject(o) {
    return o !== null && (typeof o === "function" || typeof o === "object");
}
exports.isJsObject = isJsObject;
function isArguments(value) {
    // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
    return ('length' in value) && Object.prototype.hasOwnProperty.call(value, 'callee') &&
        (!Object.prototype.propertyIsEnumerable.call(value, 'callee') || Object.prototype.toString.call(value) == argsTag);
}
exports.isArguments = isArguments;
function noop() { }
exports.noop = noop;
function stringify(token) {
    if (typeof token === 'string') {
        return token;
    }
    if (token === undefined || token === null) {
        return '' + token;
    }
    if (token.name) {
        return token.name;
    }
    var res = token.toString();
    var newLineIndex = res.indexOf("\n");
    return (newLineIndex === -1)
        ? res
        : res.substring(0, newLineIndex).replace('\r', '');
}
exports.stringify = stringify;
/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
    return value == null ? '' : (value + '');
}
exports.baseToString = baseToString;
/**
 * Converts `value` to property path array if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array} Returns the property path array.
 */
function toPath(value) {
    if (isArray(value)) {
        return value;
    }
    //return value.split('.');
    var result = [];
    baseToString(value).replace(rePropName, function (match, number, quote, string) {
        var resultValue = quote
            ? string.replace(reEscapeChar, '$1')
            : (number || match);
        result.push(resultValue);
        return resultValue;
    });
    return result;
}
exports.toPath = toPath;
function assign(destination) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    var envAssign = _global.Object['assign'] || _global.angular.extend;
    return envAssign.apply(void 0, [destination].concat(sources));
}
exports.assign = assign;
var ATTRS_BOUNDARIES = /\[|\]/g;
var COMPONENT_SELECTOR = /^\[?[\w|-]*\]?$/;
var SKEWER_CASE = /-(\w)/g;
function resolveDirectiveNameFromSelector(selector) {
    if (!selector.match(COMPONENT_SELECTOR)) {
        throw new Error("Only selectors matching element names or base attributes are supported, got: " + selector);
    }
    return selector
        .trim()
        .replace(ATTRS_BOUNDARIES, '')
        .replace(SKEWER_CASE, function (all, letter) { return letter.toUpperCase(); });
}
exports.resolveDirectiveNameFromSelector = resolveDirectiveNameFromSelector;
function getTypeName(type) {
    var typeName = getFuncName(type);
    return firstToLowerCase(typeName);
}
exports.getTypeName = getTypeName;
/**
 *
 * @param {Function}  func
 * @returns {string}
 * @private
 */
function getFuncName(func) {
    var parsedFnStatement = /function\s*([^\s(]+)/.exec(stringify(func));
    var _a = parsedFnStatement || [], _b = _a[1], name = _b === void 0 ? '' : _b;
    // if Function.name doesn't exist exec will find match otherwise return name property
    return name || stringify(func);
}
exports.getFuncName = getFuncName;
/**
 * controller instance of directive is exposed on jqLiteElement.data()
 * under the name: `$` + Ctor + `Controller`
 * @param name
 * @returns {string}
 */
function controllerKey(name) {
    return '$' + name + 'Controller';
}
exports.controllerKey = controllerKey;
function hasCtorInjectables(Type) {
    return (Array.isArray(Type.$inject) && Type.$inject.length !== 0);
}
exports.hasCtorInjectables = hasCtorInjectables;
function firstToLowerCase(value) {
    return _firstTo(value, String.prototype.toLowerCase);
}
exports.firstToLowerCase = firstToLowerCase;
function firstToUpperCase(value) {
    return _firstTo(value, String.prototype.toUpperCase);
}
exports.firstToUpperCase = firstToUpperCase;
function _firstTo(value, cb) {
    return cb.call(value.charAt(0)) + value.substring(1);
}
function normalizeBlank(obj) {
    return isBlank(obj) ? null : obj;
}
exports.normalizeBlank = normalizeBlank;
function normalizeBool(obj) {
    return isBlank(obj) ? false : obj;
}
exports.normalizeBool = normalizeBool;
function print(obj) {
    console.log(obj);
}
exports.print = print;
/**
 * Angular 2 setValueOnPath
 * supports only `.` path separator
 * @param global
 * @param path
 * @param value
 */
function setValueOnPath(global, path, value) {
    var parts = path.split('.');
    var obj = global;
    while (parts.length > 1) {
        var name = parts.shift();
        if (obj.hasOwnProperty(name) && isPresent(obj[name])) {
            obj = obj[name];
        }
        else {
            obj = obj[name] = {};
        }
    }
    if (obj === undefined || obj === null) {
        obj = {};
    }
    obj[parts.shift()] = value;
}
exports.setValueOnPath = setValueOnPath;
/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
    return isJsObject(value)
        ? value
        : Object(value);
}
exports.toObject = toObject;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
    if (length === void 0) { length = MAX_SAFE_INTEGER; }
    value = (isNumber(value) || reIsUint.test(value))
        ? +value
        : -1;
    return value > -1 && value % 1 == 0 && value < length;
}
exports.isIndex = isIndex;
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
    if ((isString(value) && reIsPlainProp.test(value)) || isNumber(value)) {
        return true;
    }
    if (isArray(value)) {
        return false;
    }
    var result = !reIsDeepProp.test(value);
    return result || (object != null && value in toObject(object));
}
exports.isKey = isKey;
//# sourceMappingURL=lang.js.map