/// <reference types="angular" />
import { Type } from '../facade/type';
export declare type IRender<T> = (Directive: Type, {jqHost, attrs, jqChildren}?: {
    jqHost?: ng.IAugmentedJQuery;
    attrs?: {
        [key: string]: any;
    };
    jqChildren?: ng.IAugmentedJQuery;
}) => {
    compiledElement: ng.IAugmentedJQuery;
    ctrl: T;
};
/**
 * factory which will return function which will be used as your render method
 */
export declare function renderFactory($compile: ng.ICompileService, $scope: any): <T extends Type>(Directive: T, {jqHost, attrs, jqChildren}?: {
    jqHost?: ng.IAugmentedJQuery;
    attrs?: {
        [key: string]: any;
    };
    jqChildren?: ng.IAugmentedJQuery;
}) => {
    compiledElement: ng.IAugmentedJQuery;
    ctrl: T;
};
export declare function getInput(element: ng.IAugmentedJQuery): JQuery;
