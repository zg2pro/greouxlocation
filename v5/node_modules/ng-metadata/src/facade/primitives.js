"use strict";
var lang_1 = require("./lang");
var _kebabCase = _caseTransformerFactory('-');
var _snakeCase = _caseTransformerFactory('_');
var StringWrapper = (function () {
    function StringWrapper() {
    }
    StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
    StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
    StringWrapper.split = function (s, regExp) { return s.split(regExp); };
    StringWrapper.equals = function (s, s2) { return s === s2; };
    StringWrapper.stripLeft = function (s, charVal) {
        if (s && s.length) {
            var pos = 0;
            for (var i = 0; i < s.length; i++) {
                if (s[i] != charVal)
                    break;
                pos++;
            }
            s = s.substring(pos);
        }
        return s;
    };
    StringWrapper.stripRight = function (s, charVal) {
        if (s && s.length) {
            var pos = s.length;
            for (var i = s.length - 1; i >= 0; i--) {
                if (s[i] != charVal)
                    break;
                pos--;
            }
            s = s.substring(0, pos);
        }
        return s;
    };
    StringWrapper.replace = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.replaceAll = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.slice = function (s, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return s.slice(from, to === null
            ? undefined
            : to);
    };
    StringWrapper.replaceAllMapped = function (s, from, cb) {
        return s.replace(from, function () {
            var matches = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                matches[_i] = arguments[_i];
            }
            // Remove offset & string from the result array
            matches.splice(-2, 2);
            // The callback receives match, p1, ..., pn
            return cb(matches);
        });
    };
    StringWrapper.compare = function (a, b) {
        if (a < b) {
            return -1;
        }
        else if (a > b) {
            return 1;
        }
        else {
            return 0;
        }
    };
    StringWrapper.includes = function (str, searchString, position) {
        if (position === void 0) { position = 0; }
        if (String.prototype.includes) {
            return str.includes(searchString, position);
        }
        return str.indexOf(searchString, position) === position;
    };
    StringWrapper.startsWith = function (str, searchString, position) {
        if (position === void 0) { position = 0; }
        if (String.prototype.startsWith) {
            return str.startsWith(searchString, position);
        }
        return str.indexOf(searchString, position) === position;
    };
    StringWrapper.endsWith = function (str, searchString, position) {
        if (String.prototype.endsWith) {
            return str.endsWith(searchString, position);
        }
        var subjectString = str.toString();
        if (!lang_1.isNumber(position) || !isFinite(position)
            || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
    StringWrapper.kebabCase = function (name) {
        return _kebabCase(name);
    };
    StringWrapper.snakeCase = function (name) {
        return _snakeCase(name);
    };
    return StringWrapper;
}());
exports.StringWrapper = StringWrapper;
function _caseTransformerFactory(separator) {
    var SNAKE_CASE_REGEXP = /[A-Z]/g;
    return _caseTransform;
    function _caseTransform(name) {
        return name.replace(SNAKE_CASE_REGEXP, function (match, offset) {
            return (offset
                ? separator
                : '') + match.toLowerCase();
        });
    }
}
//# sourceMappingURL=primitives.js.map