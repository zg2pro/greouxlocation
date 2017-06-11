/// <reference types="angular" />
import { Type } from '../../../facade/type';
import { DirectiveMetadata, ComponentMetadata } from '../metadata_directives';
import { DirectiveCtrl, NgmDirective } from '../constants';
export declare function directiveControllerFactory<T extends DirectiveCtrl, U extends Type>(caller: T, controller: U, $injector: ng.auto.IInjectorService, locals: {
    $scope: ng.IScope;
    $element: ng.IAugmentedJQuery;
    $attrs: ng.IAttributes;
    $transclude: ng.ITranscludeFunction;
}, requireMap: StringMap, _ddo: NgmDirective, metadata: DirectiveMetadata | ComponentMetadata): T & U;
/**
 * Angular 1 copy of how to require other directives
 * @param require
 * @param $element
 * @param directive
 * @returns {any|null}
 */
export declare function getRequiredControllers(require: string | string[] | {
    [key: string]: any;
}, $element: ng.IAugmentedJQuery, directive: Type): Object | Object[] | {
    [ctrlName: string]: Object;
};
export declare function getEmptyRequiredControllers(requireMap: {
    [key: string]: string;
}): {
    [key: string]: void;
};
export declare function createNewInjectablesToMatchLocalDi(originalInjectables: string[], requireMap: {
    [key: string]: string;
}): string[];
