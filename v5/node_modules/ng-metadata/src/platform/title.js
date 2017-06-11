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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var decorators_1 = require("../core/di/decorators");
/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular 2 application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 * **NOTE:**
 * you need to import this service and register within root component ( root module in Angular 1 terms )
 *
 * ```typescript
 * // index.ts
 *
 * import * as angular from 'angular';
 * import { provide } from 'ng-metadata/core';
 * import { Title } from 'ng-metadata/platform';
 *
 * import { AppComponent} from './app';
 *
 * export AppModule = angular.module('myApp',[])
 *  // we need to register the service manually
    .service( ...provide( Title ) )
    .directive( ...provide( AppComponent ))
 * ```
 */
var Title = (function () {
    function Title($document) {
        this.$document = $document;
    }
    /**
     * Get the title of the current HTML document.
     * @returns {string}
     */
    Title.prototype.getTitle = function () { return this.$document[0].title; };
    /**
     * Set the title of the current HTML document.
     * @param newTitle
     */
    Title.prototype.setTitle = function (newTitle) { this.$document[0].title = newTitle || ''; };
    return Title;
}());
Title = __decorate([
    decorators_1.Injectable('Title'),
    __param(0, decorators_1.Inject('$document')),
    __metadata("design:paramtypes", [Object])
], Title);
exports.Title = Title;
//# sourceMappingURL=title.js.map