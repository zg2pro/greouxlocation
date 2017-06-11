"use strict";
var lang_1 = require("../../facade/lang");
var UninitializedValue = (function () {
    function UninitializedValue() {
    }
    return UninitializedValue;
}());
exports.UninitializedValue = UninitializedValue;
var uninitialized = new UninitializedValue();
/**
 * Represents a basic change from a previous to a new value.
 */
var SimpleChange = (function () {
    function SimpleChange(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
    }
    /**
     * Check whether the new value is the first value assigned.
     */
    SimpleChange.prototype.isFirstChange = function () { return this.previousValue === uninitialized; };
    return SimpleChange;
}());
exports.SimpleChange = SimpleChange;
var ChangeDetectionUtil = (function () {
    function ChangeDetectionUtil() {
    }
    ChangeDetectionUtil.simpleChange = function (previousValue, currentValue) {
        return new SimpleChange(previousValue, currentValue);
    };
    ChangeDetectionUtil.isOnPushChangeDetectionStrategy = function (changeDetectionStrategy) {
        return lang_1.isPresent(changeDetectionStrategy) && changeDetectionStrategy === 0 /* OnPush */;
    };
    return ChangeDetectionUtil;
}());
ChangeDetectionUtil.uninitialized = uninitialized;
exports.ChangeDetectionUtil = ChangeDetectionUtil;
//# sourceMappingURL=change_detection_util.js.map