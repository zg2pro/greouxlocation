/// <reference types="angular" />
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Type } from './type';
export interface BrowserNodeGlobal {
    Object: typeof Object;
    Array: typeof Array;
    Date: typeof Date;
    RegExp: typeof RegExp;
    JSON: typeof JSON;
    Math: typeof Math;
    angular: ng.IAngularStatic;
    Reflect: any;
    setTimeout: Function;
    clearTimeout: Function;
    setInterval: Function;
    clearInterval: Function;
}
declare const _global: BrowserNodeGlobal;
export { _global as global };
/**
 * Disable Angular's development mode, which turns off assertions and other
 * checks within the framework.
 *
 * One important assertion this disables verifies that a change detection pass
 * does not result in additional changes to any bindings (also known as
 * unidirectional data flow).
 */
export declare function enableProdMode(): void;
export declare function assertionsEnabled(): boolean;
export declare function isPresent(obj: any): boolean;
export declare function isBlank(obj: any): boolean;
export declare function isString(obj: any): obj is string;
export declare function isFunction(obj: any): obj is Function;
export declare function isBoolean(obj: any): obj is boolean;
export declare function isArray(obj: any): obj is Array<any>;
export declare function isNumber(obj: any): obj is number;
export declare function isDate(obj: any): obj is Date;
export declare function isType(obj: any): obj is Type;
export declare function isStringMap(obj: any): obj is Object;
export declare function isPromise(obj: any): boolean;
export declare function isPromiseLike(obj: any): boolean;
export declare function isObservable<T>(obj: any): obj is Observable<T>;
export declare function isPromiseOrObservable(obj: any): boolean;
export declare function isScope(obj: any): obj is ng.IScope;
export declare function isSubscription(obj: any): obj is Subscription;
export declare function isJsObject(o: any): boolean;
export declare function isArguments(value: any): boolean;
export declare function noop(): void;
export declare function stringify(token: any): string;
/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
export declare function baseToString(value: any): string;
/**
 * Converts `value` to property path array if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array} Returns the property path array.
 */
export declare function toPath(value: any): any[];
export declare function assign(destination: any, ...sources: any[]): any;
export declare function resolveDirectiveNameFromSelector(selector: string): string;
export declare function getTypeName(type: any): string;
/**
 *
 * @param {Function}  func
 * @returns {string}
 * @private
 */
export declare function getFuncName(func: Function): string;
/**
 * controller instance of directive is exposed on jqLiteElement.data()
 * under the name: `$` + Ctor + `Controller`
 * @param name
 * @returns {string}
 */
export declare function controllerKey(name: string): string;
export declare function hasCtorInjectables(Type: any): boolean;
export declare function firstToLowerCase(value: string): string;
export declare function firstToUpperCase(value: string): string;
export declare function normalizeBlank(obj: Object): any;
export declare function normalizeBool(obj: boolean): boolean;
export declare function print(obj: Error | Object): void;
/**
 * Angular 2 setValueOnPath
 * supports only `.` path separator
 * @param global
 * @param path
 * @param value
 */
export declare function setValueOnPath(global: any, path: string, value: any): void;
/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
export declare function toObject(value: any): Object | Function;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
export declare function isIndex(value: any, length?: number): boolean;
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
export declare function isKey(value: any, object: Object): boolean;
