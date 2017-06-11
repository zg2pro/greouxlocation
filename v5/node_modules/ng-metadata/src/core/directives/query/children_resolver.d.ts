/// <reference types="angular" />
import { QueryMetadata, ViewQueryMetadata } from '../metadata_di';
import { DirectiveCtrl } from '../constants';
import { Type } from '../../../facade/type';
/**
 * setup watchers for children component/directives provided by @Query decorators
 * - setup @ContentChild/@ContentChildren/@ViewChild/@ViewChildren
 * @param scope
 * @param element
 * @param ctrl
 * @param queries
 * @private
 */
export declare function _setupQuery(scope: ng.IScope, element: ng.IAugmentedJQuery, ctrl: DirectiveCtrl, queries: {
    [key: string]: QueryMetadata | ViewQueryMetadata;
}): void;
/**
 * resolving DOM instances by provided @ContentChild(ref)/@ViewChild(ref)
 * - if querying for string, we handle it as a selector and return jqLite instances
 * - if querying for Type( directive | component ) we get proper selector and controller from
 * provided Type reference, query the DOM and return that controller instance if exists, otherwise null
 * @param element
 * @param ctrl
 * @param key
 * @param cssSelector
 * @param type
 * @param firstOnly
 * @returns {function(): void}
 * @private
 */
export declare function _resolveChildrenFactory(element: ng.IAugmentedJQuery, ctrl: any, key: string, cssSelector: string | Type, type: string, firstOnly?: boolean): () => void;
/**
 * query View/Content DOM for particular child elements/attributes selector
 * @param $element
 * @param selector
 * @param type
 * @param firstOnly
 * @returns {IAugmentedJQuery}
 * @private
 */
export declare function _getChildElements($element: ng.IAugmentedJQuery, selector: string, type: string, firstOnly?: boolean): ng.IAugmentedJQuery;
export declare function _getSelectorAndCtrlName(childSelector: string | Type): {
    selector: string;
    childCtrlName: string;
};
/**
 * get CSS selector from Component/Directive decorated class metadata
 * @param selector
 * @returns {string}
 * @private
 */
export declare function _getSelector(selector: string | Type): string;
/**
 * creates functions which will be called from parent component which is querying this component
 * - component which queries needs to be injected to child,
 * here child creates special callbacks by type of @Query which will be called from postLink and on scope destroy so
 * we clean up GC
 * @param ctrl
 * @param requiredCtrls
 * @returns {Object|Array|T|function()[]}
 * @private
 */
export declare function _getParentCheckNotifiers(ctrl: DirectiveCtrl, requiredCtrls: Object[]): Function[];
export declare function getControllerOnElement($element: ng.IAugmentedJQuery, ctrlName: string): any;
