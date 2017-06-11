"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var decorators_1 = require("../../core/directives/decorators");
var NgSelect = (function () {
    function NgSelect() {
    }
    NgSelect.prototype.renderUnknownOption = function (val) { };
    NgSelect.prototype.removeUnknownOption = function () { };
    // Write the value to the select control, the implementation of this changes depending
    // upon whether the select can have multiple values and whether ngOptions is at work.
    NgSelect.prototype.writeValue = function (value) { };
    // Tell the select control that an option, with the given value, has been added
    NgSelect.prototype.addOption = function (value, element) { };
    // Tell the select control that an option, with the given value, has been removed
    NgSelect.prototype.removeOption = function (value) { };
    NgSelect.prototype.registerOption = function (optionScope, optionElement, optionAttrs, interpolateValueFn, interpolateTextFn) { };
    return NgSelect;
}());
NgSelect = __decorate([
    decorators_1.Directive({ selector: 'select' }),
    __metadata("design:paramtypes", [])
], NgSelect);
exports.NgSelect = NgSelect;
//# sourceMappingURL=ng_select.js.map