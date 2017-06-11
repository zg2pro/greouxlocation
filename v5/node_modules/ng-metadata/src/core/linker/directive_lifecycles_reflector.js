"use strict";
var type_1 = require("../../facade/type");
var directive_lifecycle_interfaces_1 = require("./directive_lifecycle_interfaces");
function hasLifecycleHook(lcInterface, token) {
    if (!(token instanceof type_1.Type))
        return false;
    var proto = token.prototype;
    switch (lcInterface) {
        case directive_lifecycle_interfaces_1.LifecycleHooks.AfterContentInit:
            return !!proto.ngAfterContentInit;
        case directive_lifecycle_interfaces_1.LifecycleHooks.AfterContentChecked:
            return !!proto.ngAfterContentChecked;
        case directive_lifecycle_interfaces_1.LifecycleHooks.AfterViewInit:
            return !!proto.ngAfterViewInit;
        case directive_lifecycle_interfaces_1.LifecycleHooks.AfterViewChecked:
            return !!proto.ngAfterViewChecked;
        case directive_lifecycle_interfaces_1.LifecycleHooks.OnDestroy:
            return !!proto.ngOnDestroy;
        case directive_lifecycle_interfaces_1.LifecycleHooks.OnInit:
            return !!proto.ngOnInit;
        case directive_lifecycle_interfaces_1.LifecycleHooks.OnChanges:
            return !!proto.ngOnChanges;
        case directive_lifecycle_interfaces_1.LifecycleHooks.DoCheck:
            return !!proto.ngDoCheck;
        case directive_lifecycle_interfaces_1.LifecycleHooks._OnChildrenChanged:
            return !!proto._ngOnChildrenChanged;
        default:
            return false;
    }
}
exports.hasLifecycleHook = hasLifecycleHook;
/**
 * @internal
 */
function resolveImplementedLifeCycleHooks(type) {
    return {
        ngOnInit: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks.OnInit, type),
        ngOnChanges: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks.OnChanges, type),
        ngDoCheck: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks.DoCheck, type),
        ngAfterContentInit: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks.AfterContentInit, type),
        ngAfterContentChecked: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks.AfterContentChecked, type),
        ngAfterViewInit: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks.AfterViewInit, type),
        ngAfterViewChecked: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks.AfterViewChecked, type),
        ngOnDestroy: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks.OnDestroy, type),
        _ngOnChildrenChanged: hasLifecycleHook(directive_lifecycle_interfaces_1.LifecycleHooks._OnChildrenChanged, type)
    };
}
exports.resolveImplementedLifeCycleHooks = resolveImplementedLifeCycleHooks;
//# sourceMappingURL=directive_lifecycles_reflector.js.map