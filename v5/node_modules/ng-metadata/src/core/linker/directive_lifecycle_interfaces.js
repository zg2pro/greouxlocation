"use strict";
var LifecycleHooks;
(function (LifecycleHooks) {
    LifecycleHooks[LifecycleHooks["OnInit"] = 0] = "OnInit";
    LifecycleHooks[LifecycleHooks["OnDestroy"] = 1] = "OnDestroy";
    LifecycleHooks[LifecycleHooks["DoCheck"] = 2] = "DoCheck";
    LifecycleHooks[LifecycleHooks["OnChanges"] = 3] = "OnChanges";
    LifecycleHooks[LifecycleHooks["AfterContentInit"] = 4] = "AfterContentInit";
    LifecycleHooks[LifecycleHooks["AfterContentChecked"] = 5] = "AfterContentChecked";
    LifecycleHooks[LifecycleHooks["AfterViewInit"] = 6] = "AfterViewInit";
    LifecycleHooks[LifecycleHooks["AfterViewChecked"] = 7] = "AfterViewChecked";
    LifecycleHooks[LifecycleHooks["_OnChildrenChanged"] = 8] = "_OnChildrenChanged";
})(LifecycleHooks = exports.LifecycleHooks || (exports.LifecycleHooks = {}));
/**
 * @internal
 */
exports.LIFECYCLE_HOOKS_VALUES = [
    LifecycleHooks.OnInit,
    LifecycleHooks.OnDestroy,
    LifecycleHooks.DoCheck,
    LifecycleHooks.OnChanges,
    LifecycleHooks.AfterContentInit,
    LifecycleHooks.AfterContentChecked,
    LifecycleHooks.AfterViewInit,
    LifecycleHooks.AfterViewChecked,
    LifecycleHooks._OnChildrenChanged
];
var ChildrenChangeHook;
(function (ChildrenChangeHook) {
    ChildrenChangeHook[ChildrenChangeHook["FromView"] = 0] = "FromView";
    ChildrenChangeHook[ChildrenChangeHook["FromContent"] = 1] = "FromContent";
})(ChildrenChangeHook = exports.ChildrenChangeHook || (exports.ChildrenChangeHook = {}));
//# sourceMappingURL=directive_lifecycle_interfaces.js.map