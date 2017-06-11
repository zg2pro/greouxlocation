"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = require("./lang");
var Subject_1 = require("rxjs/Subject");
/**
 * Use by directives and components to emit custom Events.
 *
 * ### Examples
 *
 * In the following example, `ZippyComponent` alternatively emits `open` and `close` events when its
 * title gets clicked:
 *
 * ```
 * @Component({
 *   selector: 'zippy',
 *   template: `
 *   <div class="zippy">
 *     <div ng-click="$ctrl.toggle()">Toggle</div>
 *     <div ng-hide="!$ctrl.visible">
 *       <ng-transclude></ng-transclude>
 *     </div>
 *  </div>`
 * })
 * export class ZippyComponent {
 *   visible: boolean = true;
 *
 *   @Output() open = new EventEmitter<boolean>();
 *   @Output() close = new EventEmitter<boolean>();
 *
 *   toggle() {
 *     this.visible = !this.visible;
 *     if (this.visible) {
 *       this.open.emit( this.visible );
 *     } else {
 *       this.close.emit( this.visible );
 *     }
 *   }
 * }
 * ```
 *
 * Use Rx.Observable but provides an adapter to make it work as specified here:
 * https://github.com/jhusain/observable-spec
 *
 * Once a reference implementation of the spec is available, switch to it.
 */
var EventEmitter = (function (_super) {
    __extends(EventEmitter, _super);
    /**
     * Creates an instance of [EventEmitter], which depending on [isAsync],
     * delivers events synchronously or asynchronously.
     */
    function EventEmitter(isAsync) {
        if (isAsync === void 0) { isAsync = false; }
        var _this = _super.call(this) || this;
        /** @internal */
        _this._ngExpressionBindingCb = lang_1.noop;
        _this.__isAsync = isAsync;
        return _this;
    }
    /** @internal */
    EventEmitter.prototype.wrapNgExpBindingToEmitter = function (cb) {
        //used in reassignBindingsAndCreteEventEmitters to attach the original @Output binding to the instance new EventEmitter
        this._ngExpressionBindingCb = cb;
        // this could create memory leaks because the subscription would be never terminated
        // super.subscribe((newValue)=>this._ngExpressionBindingCb({$event:newValue}));
    };
    EventEmitter.prototype.emit = function (value) {
        var payload = { $event: value };
        // push just the value
        _super.prototype.next.call(this, value);
        // our & binding needs to be called via { $event: value } because Angular 1 locals
        this._ngExpressionBindingCb(payload);
    };
    EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
        var schedulerFn /** TODO #9100 */;
        var errorFn = function (err) { return null; };
        var completeFn = function () { return null; };
        if (generatorOrNext && typeof generatorOrNext === 'object') {
            schedulerFn = this.__isAsync
                ? function (value /** TODO #9100 */) { setTimeout(function () { return generatorOrNext.next(value); }); }
                : function (value /** TODO #9100 */) { generatorOrNext.next(value); };
            if (generatorOrNext.error) {
                errorFn = this.__isAsync
                    ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); }
                    : function (err) { generatorOrNext.error(err); };
            }
            if (generatorOrNext.complete) {
                completeFn = this.__isAsync
                    ? function () { setTimeout(function () { return generatorOrNext.complete(); }); }
                    : function () { generatorOrNext.complete(); };
            }
        }
        else {
            schedulerFn = this.__isAsync
                ? function (value /** TODO #9100 */) { setTimeout(function () { return generatorOrNext(value); }); }
                : function (value /** TODO #9100 */) { generatorOrNext(value); };
            if (error) {
                errorFn = this.__isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
            }
            if (complete) {
                completeFn = this.__isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
            }
        }
        return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
    };
    return EventEmitter;
}(Subject_1.Subject));
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=async.js.map