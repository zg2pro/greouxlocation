/// <reference types="angular" />
/**
 *
 * @param element
 * @param staticAttributes
 * @private
 */
export declare function _setHostStaticAttributes(element: ng.IAugmentedJQuery, staticAttributes: StringMap): void;
/**
 * return $event or it's property if found via path
 * @param event
 * @param eventParams
 * @returns {Array}
 * @private
 */
export declare function _getHostListenerCbParams(event: any, eventParams: string[]): any[];
