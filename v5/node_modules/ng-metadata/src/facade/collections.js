"use strict";
var lang_1 = require("./lang");
var INFINITY = 1 / 0;
/**
 * Wraps Javascript Objects
 */
var StringMapWrapper = (function () {
    function StringMapWrapper() {
    }
    StringMapWrapper.create = function () {
        // Note: We are not using Object.create(null) here due to
        // performance!
        // http://jsperf.com/ng2-object-create-null
        return {};
    };
    StringMapWrapper.contains = function (map, key) {
        return map.hasOwnProperty(key);
    };
    /**
     * The base implementation of `getValueFromPath` without support for string paths
     * and default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path of the property to get.
     * @param {string} [pathKey] The key representation of path.
     * @returns {*} Returns the resolved value.
     */
    StringMapWrapper.baseGet = function (object, path, pathKey) {
        if (object == null) {
            return;
        }
        object = lang_1.toObject(object);
        if (pathKey !== undefined && pathKey in object) {
            path = [pathKey];
        }
        var index = 0, length = path.length;
        while (object != null && index < length) {
            object = lang_1.toObject(object)[path[index++]];
        }
        return (index && index == length)
            ? object
            : undefined;
    };
    /**
     * Gets the property value at `path` of `object`. If the resolved value is
     * `undefined` the `defaultValue` is used in its place.
     *
     * @static
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    StringMapWrapper.getValueFromPath = function (object, path, defaultValue) {
        var result = object == null
            ? undefined
            : StringMapWrapper.baseGet(object, lang_1.toPath(path), (path + ''));
        return result === undefined
            ? defaultValue
            : result;
    };
    /**
     * Sets the property value of `path` on `object`. If a portion of `path`
     * does not exist it's created.
     *
     * @static
     * @param {Object} object The object to augment.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, 'x[0].y.z', 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
    StringMapWrapper.setValueInPath = function (object, path, value) {
        if (object == null) {
            return object;
        }
        var pathKey = (path + '');
        path = (object[pathKey] != null || lang_1.isKey(path, object))
            ? [pathKey]
            : lang_1.toPath(path);
        var index = -1, length = path.length, lastIndex = length - 1, nested = object;
        while (nested != null && ++index < length) {
            var key = path[index];
            if (lang_1.isJsObject(nested)) {
                if (index == lastIndex) {
                    nested[key] = value;
                }
                else if (nested[key] == null) {
                    nested[key] = lang_1.isIndex(path[index + 1])
                        ? []
                        : {};
                }
            }
            nested = nested[key];
        }
        return object;
    };
    StringMapWrapper.get = function (map, key) {
        return map.hasOwnProperty(key)
            ? map[key]
            : undefined;
    };
    StringMapWrapper.set = function (map, key, value) { map[key] = value; };
    StringMapWrapper.keys = function (map) { return Object.keys(map); };
    StringMapWrapper.size = function (map) { return StringMapWrapper.keys(map).length; };
    StringMapWrapper.isEmpty = function (map) {
        for (var prop in map) {
            return false;
        }
        return true;
    };
    StringMapWrapper.delete = function (map, key) { delete map[key]; };
    StringMapWrapper.forEach = function (map, callback) {
        for (var prop in map) {
            if (map.hasOwnProperty(prop)) {
                callback(map[prop], prop);
            }
        }
    };
    StringMapWrapper.values = function (map) {
        return Object.keys(map).reduce(function (r, a) {
            r.push(map[a]);
            return r;
        }, []);
    };
    StringMapWrapper.merge = function (m1, m2) {
        var m = {};
        for (var attr in m1) {
            if (m1.hasOwnProperty(attr)) {
                m[attr] = m1[attr];
            }
        }
        for (var attr in m2) {
            if (m2.hasOwnProperty(attr)) {
                m[attr] = m2[attr];
            }
        }
        return m;
    };
    StringMapWrapper.equals = function (m1, m2) {
        var k1 = Object.keys(m1);
        var k2 = Object.keys(m2);
        if (k1.length != k2.length) {
            return false;
        }
        var key;
        for (var i = 0; i < k1.length; i++) {
            key = k1[i];
            if (m1[key] !== m2[key]) {
                return false;
            }
        }
        return true;
    };
    StringMapWrapper.assign = function (target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        if (!lang_1.isPresent(target)) {
            throw new TypeError('Object.assign cannot be called with null or undefined');
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        if (Object.assign) {
            return (_a = Object).assign.apply(_a, [target].concat(sources));
        }
        var from;
        var to = Object(target);
        for (var s = 0; s < sources.length; s++) {
            from = Object(sources[s]);
            for (var key in from) {
                if (hasOwnProperty.call(from, key)) {
                    to[key] = from[key];
                }
            }
        }
        return to;
        var _a;
    };
    return StringMapWrapper;
}());
exports.StringMapWrapper = StringMapWrapper;
var ListWrapper = (function () {
    function ListWrapper() {
    }
    ListWrapper.create = function () { return []; };
    ListWrapper.size = function (array) { return array.length; };
    // JS has no way to express a statically fixed size list, but dart does so we
    // keep both methods.
    ListWrapper.createFixedSize = function (size) { return new Array(size); };
    ListWrapper.createGrowableSize = function (size) { return new Array(size); };
    ListWrapper.clone = function (array) { return array.slice(0); };
    ListWrapper.forEachWithIndex = function (array, fn) {
        for (var i = 0; i < array.length; i++) {
            fn(array[i], i);
        }
    };
    ListWrapper.first = function (array) {
        if (!array)
            return null;
        return array[0];
    };
    ListWrapper.last = function (array) {
        if (!array || array.length == 0)
            return null;
        return array[array.length - 1];
    };
    ListWrapper.indexOf = function (array, value, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        return array.indexOf(value, startIndex);
    };
    ListWrapper.contains = function (list, el) { return list.indexOf(el) !== -1; };
    ListWrapper.reversed = function (array) {
        var a = ListWrapper.clone(array);
        return a.reverse();
    };
    ListWrapper.concat = function (a, b) { return a.concat(b); };
    ListWrapper.insert = function (list, index, value) { list.splice(index, 0, value); };
    ListWrapper.removeAt = function (list, index) {
        var res = list[index];
        list.splice(index, 1);
        return res;
    };
    ListWrapper.removeAll = function (list, items) {
        for (var i = 0; i < items.length; ++i) {
            var index = list.indexOf(items[i]);
            list.splice(index, 1);
        }
    };
    ListWrapper.remove = function (list, el) {
        var index = list.indexOf(el);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    };
    ListWrapper.clear = function (list) { list.length = 0; };
    ListWrapper.isEmpty = function (list) { return list.length == 0; };
    ListWrapper.fill = function (list, value, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = null; }
        if (!Array.prototype.fill) {
            Array.prototype.fill = function (value) {
                // Steps 1-2.
                if (this == null) {
                    throw new TypeError('this is null or not defined');
                }
                var O = Object(this);
                // Steps 3-5.
                var len = O.length >>> 0;
                // Steps 6-7.
                var start = arguments[1];
                var relativeStart = start >> 0;
                // Step 8.
                var k = relativeStart < 0
                    ? Math.max(len + relativeStart, 0)
                    : Math.min(relativeStart, len);
                // Steps 9-10.
                var end = arguments[2];
                var relativeEnd = end === undefined
                    ? len
                    : end >> 0;
                // Step 11.
                var final = relativeEnd < 0
                    ? Math.max(len + relativeEnd, 0)
                    : Math.min(relativeEnd, len);
                // Step 12.
                while (k < final) {
                    O[k] = value;
                    k++;
                }
                // Step 13.
                return O;
            };
        }
        list.fill(value, start, end === null
            ? list.length
            : end);
    };
    ListWrapper.equals = function (a, b) {
        if (a.length != b.length)
            return false;
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    ListWrapper.slice = function (l, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return l.slice(from, to === null
            ? undefined
            : to);
    };
    ListWrapper.splice = function (l, from, length) { return l.splice(from, length); };
    ListWrapper.sort = function (l, compareFn) {
        if (lang_1.isPresent(compareFn)) {
            l.sort(compareFn);
        }
        else {
            l.sort();
        }
    };
    ListWrapper.toString = function (l) { return l.toString(); };
    ListWrapper.toJSON = function (l) { return JSON.stringify(l); };
    ListWrapper.maximum = function (list, predicate) {
        if (list.length == 0) {
            return null;
        }
        var solution = null;
        var maxValue = -Infinity;
        for (var index = 0; index < list.length; index++) {
            var candidate = list[index];
            if (lang_1.isBlank(candidate)) {
                continue;
            }
            var candidateValue = predicate(candidate);
            if (candidateValue > maxValue) {
                solution = candidate;
                maxValue = candidateValue;
            }
        }
        return solution;
    };
    ListWrapper.find = function (arr, predicate, ctx) {
        if (lang_1.isFunction(Array.prototype['find'])) {
            return arr.find(predicate, ctx);
        }
        ctx = ctx || this;
        var length = arr.length;
        var i;
        if (!lang_1.isFunction(predicate)) {
            throw new TypeError(predicate + " is not a function");
        }
        for (i = 0; i < length; i++) {
            if (predicate.call(ctx, arr[i], i, arr)) {
                return arr[i];
            }
        }
        return undefined;
    };
    ListWrapper.findIndex = function (arr, predicate, ctx) {
        if (lang_1.isFunction(Array.prototype['findIndex'])) {
            return arr.findIndex(predicate, ctx);
        }
        if (!lang_1.isFunction(predicate)) {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(arr);
        var len = list.length;
        if (len === 0) {
            return -1;
        }
        for (var i = 0; i < len; i++) {
            if (predicate.call(ctx, list[i], i, list)) {
                return i;
            }
        }
        return -1;
    };
    ListWrapper.isFlattenable = function (value) {
        return lang_1.isArray(value) || lang_1.isArguments(value);
    };
    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
    ListWrapper.arrayPush = function (array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
            array[offset + index] = values[index];
        }
        return array;
    };
    /**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {number} depth The maximum recursion depth.
     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    ListWrapper.baseFlatten = function (array, depth, predicate, isStrict, result) {
        if (predicate === void 0) { predicate = ListWrapper.isFlattenable; }
        if (isStrict === void 0) { isStrict = false; }
        if (result === void 0) { result = []; }
        var index = -1;
        var length = array.length;
        while (++index < length) {
            var value = array[index];
            if (depth > 0 && predicate(value)) {
                if (depth > 1) {
                    // Recursively flatten arrays (susceptible to call stack limits).
                    ListWrapper.baseFlatten(value, depth - 1, predicate, isStrict, result);
                }
                else {
                    ListWrapper.arrayPush(result, value);
                }
            }
            else if (!isStrict) {
                result[result.length] = value;
            }
        }
        return result;
    };
    /**
     * Flattens `array` a single level deep.
     *
     * @static
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, [3, [4]], 5]]);
     * // => [1, 2, [3, [4]], 5]
     */
    ListWrapper.flatten = function (array) {
        var length = array ? array.length : 0;
        return length ? ListWrapper.baseFlatten(array, 1) : [];
    };
    /**
     * Recursively flattens `array`.
     *
     * @static
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, [3, [4]], 5]]);
     * // => [1, 2, 3, 4, 5]
     */
    ListWrapper.flattenDeep = function (array) {
        var length = array
            ? array.length
            : 0;
        return length
            ? ListWrapper.baseFlatten(array, INFINITY)
            : [];
    };
    return ListWrapper;
}());
exports.ListWrapper = ListWrapper;
//# sourceMappingURL=collections.js.map