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
var decorators_1 = require("../../core/pipes/decorators");
var lang_1 = require("../../facade/lang");
/**
 * Based on @cvuorinen angular1-async-filter implementation
 * @link https://github.com/cvuorinen/angular1-async-filter
 *
 * The `async` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has emitted.
 * When a new value is emitted, the `async` pipe marks the component to be checked for changes. ( runs $scope.$digest() )
 * When the component gets destroyed, the `async` pipe unsubscribes automatically to avoid potential memory leaks.
 *
 * ## Usage
 *
 *  object | async // for non observable
 *  object | async:this // for observable
 *
 * where:
 *  - `object` is one of type `Observable`, `Promise`, 'ng.IPromise' or 'ng.IHttpPromise'
 *  - `this` is pipe parameter ( in angular 1 reference to local $Scope ( we need for Observable disposal )
 *
 *  If you are using async with observables nad you don't provide scope we will throw Error to let you know that you forgot `this`, #perfmatters baby!
 *
 * ## Examples
 *
 * This example binds a `Promise` to the view. Clicking the `Resolve` button resolves the promise.
 *
 * {@example core/pipes/ts/async_pipe/async_pipe_example.ts region='AsyncPipePromise'}
 *
 * It's also possible to use `async` with Observables. The example below binds the `time` Observable
 * to the view. Every 500ms, the `time` Observable updates the view with the current time.
 *
 * {@example core/pipes/ts/async_pipe/async_pipe_example.ts region='AsyncPipeObservable'}
 */
var AsyncPipe = AsyncPipe_1 = (function () {
    function AsyncPipe() {
    }
    AsyncPipe._objectId = function (obj) {
        if (!obj.hasOwnProperty(AsyncPipe_1.TRACK_PROP_NAME)) {
            obj[AsyncPipe_1.TRACK_PROP_NAME] = ++AsyncPipe_1.nextObjectID;
        }
        return obj[AsyncPipe_1.TRACK_PROP_NAME];
    };
    AsyncPipe._getSubscriptionStrategy = function (input) {
        return input.subscribe && input.subscribe.bind(input)
            || input.success && input.success.bind(input) // To make it work with HttpPromise
            || input.then.bind(input); // To make it work with Promise
    };
    AsyncPipe._markForCheck = function (scope) {
        if (lang_1.isScope(scope)) {
            // #perfmatters
            // wait till event loop is free and run just local digest so we don't get in conflict with other local $digest
            setTimeout(function () { return scope.$digest(); });
        }
    };
    AsyncPipe._dispose = function (inputId) {
        if (lang_1.isSubscription(AsyncPipe_1.subscriptions[inputId])) {
            AsyncPipe_1.subscriptions[inputId].unsubscribe();
        }
        delete AsyncPipe_1.subscriptions[inputId];
        delete AsyncPipe_1.values[inputId];
    };
    AsyncPipe.prototype.transform = function (input, scope) {
        if (!lang_1.isPromiseOrObservable(input)) {
            return input;
        }
        if (lang_1.isObservable(input) && !lang_1.isScope(scope)) {
            throw new Error('AsyncPipe: you have to specify "this" as parameter so we can unsubscribe on scope.$destroy!');
        }
        var inputId = AsyncPipe_1._objectId(input);
        // return cached immediately
        if (inputId in AsyncPipe_1.subscriptions) {
            return AsyncPipe_1.values[inputId];
        }
        var subscriptionStrategy = AsyncPipe_1._getSubscriptionStrategy(input);
        AsyncPipe_1.subscriptions[inputId] = subscriptionStrategy(_setSubscriptionValue);
        if (lang_1.isScope(scope)) {
            // Clean up subscription and its last value when the scope is destroyed.
            scope.$on('$destroy', function () { AsyncPipe_1._dispose(inputId); });
        }
        function _setSubscriptionValue(value) {
            AsyncPipe_1.values[inputId] = value;
            // this is needed only for Observables
            AsyncPipe_1._markForCheck(scope);
        }
    };
    return AsyncPipe;
}());
// Need a way to tell the input objects apart from each other (so we only subscribe to them once)
AsyncPipe.nextObjectID = 0;
AsyncPipe.values = {};
AsyncPipe.subscriptions = {};
AsyncPipe.TRACK_PROP_NAME = '__asyncFilterObjectID__';
AsyncPipe = AsyncPipe_1 = __decorate([
    decorators_1.Pipe({ name: 'async' /*, pure: false*/ }),
    __metadata("design:paramtypes", [])
], AsyncPipe);
exports.AsyncPipe = AsyncPipe;
var AsyncPipe_1;
//# sourceMappingURL=async_pipe.js.map