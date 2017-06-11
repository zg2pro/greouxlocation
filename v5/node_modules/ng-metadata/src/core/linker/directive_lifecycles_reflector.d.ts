import { LifecycleHooks } from './directive_lifecycle_interfaces';
export declare function hasLifecycleHook(lcInterface: LifecycleHooks, token: any): boolean;
export declare type ImplementedLifeCycleHooks = {
    ngOnInit: boolean;
    ngOnChanges: boolean;
    ngDoCheck: boolean;
    ngAfterContentInit: boolean;
    ngAfterContentChecked: boolean;
    ngAfterViewInit: boolean;
    ngAfterViewChecked: boolean;
    ngOnDestroy: boolean;
    _ngOnChildrenChanged: boolean;
};
