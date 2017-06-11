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
var NgForm = (function () {
    function NgForm() {
    }
    NgForm.prototype.$addControl = function (control) { };
    NgForm.prototype.$removeControl = function (control) { };
    NgForm.prototype.$setValidity = function (validationErrorKey, isValid, control) { };
    NgForm.prototype.$setDirty = function () { };
    NgForm.prototype.$setPristine = function () { };
    NgForm.prototype.$commitViewValue = function () { };
    NgForm.prototype.$rollbackViewValue = function () { };
    NgForm.prototype.$setSubmitted = function () { };
    NgForm.prototype.$setUntouched = function () { };
    return NgForm;
}());
NgForm = __decorate([
    decorators_1.Directive({ selector: 'form' }),
    __metadata("design:paramtypes", [])
], NgForm);
exports.NgForm = NgForm;
//# sourceMappingURL=ng_form.js.map