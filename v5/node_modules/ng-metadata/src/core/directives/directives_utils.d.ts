/// <reference types="angular" />
import { DirectiveMetadata, ComponentMetadata } from './metadata_directives';
/**
 * use #isDirective instead
 * @deprecated
 */
export declare function isAttrDirective(metadata: any): metadata is DirectiveMetadata;
/**
 * use #isComponent instead
 * @deprecated
 */
export declare function isComponentDirective(metadata: any): metadata is ComponentMetadata;
/**
 *
 * @param scope
 * @param element
 * @param ctrl
 * @param implementsNgOnDestroy
 * @param watchersToDispose
 * @param observersToDispose
 * @private
 */
export declare function _setupDestroyHandler(scope: ng.IScope, element: ng.IAugmentedJQuery, ctrl: any, implementsNgOnDestroy: boolean, watchersToDispose?: Function[], observersToDispose?: Function[]): void;
