/**
 * Wraps Javascript Objects
 */
export declare class StringMapWrapper {
    static create(): {
        [k: string]: any;
    };
    static contains(map: {
        [key: string]: any;
    }, key: string): boolean;
    /**
     * The base implementation of `getValueFromPath` without support for string paths
     * and default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path of the property to get.
     * @param {string} [pathKey] The key representation of path.
     * @returns {*} Returns the resolved value.
     */
    static baseGet(object: Object, path: string[], pathKey?: string): Object;
    /**
     * Gets the property value at `path` of `object`. If the resolved value is
     * `undefined` the `defaultValue` is used in its place.
     *
     * @static
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    static getValueFromPath(object: Object, path: string | any[], defaultValue?: any): any;
    /**
     * Sets the property value of `path` on `object`. If a portion of `path`
     * does not exist it's created.
     *
     * @static
     * @param {Object} object The object to augment.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, 'x[0].y.z', 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
    static setValueInPath<O, M>(object: any, path: string | any[], value: any): M;
    static get<V>(map: {
        [key: string]: V;
    }, key: string): V;
    static set<V>(map: {
        [key: string]: V;
    }, key: string, value: V): void;
    static keys(map: {
        [key: string]: any;
    }): string[];
    static size(map: {
        [key: string]: any;
    }): number;
    static isEmpty(map: {
        [key: string]: any;
    }): boolean;
    static delete(map: {
        [key: string]: any;
    }, key: string): void;
    static forEach<K, V>(map: {
        [key: string]: V;
    }, callback: Function): void;
    static values<T>(map: {
        [key: string]: T;
    }): T[];
    static merge<V>(m1: {
        [key: string]: V;
    }, m2: {
        [key: string]: V;
    }): {
        [key: string]: V;
    };
    static equals<V>(m1: {
        [key: string]: V;
    }, m2: {
        [key: string]: V;
    }): boolean;
    static assign(target: any, ...sources: any[]): any;
}
/**
 * A boolean-valued function over a value, possibly including context information
 * regarding that value's position in an array.
 */
export interface Predicate<T> {
    (value: T, index?: number, array?: T[]): boolean;
}
export declare class ListWrapper {
    static create(): any[];
    static size(array: any[]): number;
    static createFixedSize(size: number): any[];
    static createGrowableSize(size: number): any[];
    static clone<T>(array: T[]): T[];
    static forEachWithIndex<T>(array: T[], fn: (t: T, n: number) => void): void;
    static first<T>(array: T[]): T;
    static last<T>(array: T[]): T;
    static indexOf<T>(array: T[], value: T, startIndex?: number): number;
    static contains<T>(list: T[], el: T): boolean;
    static reversed<T>(array: T[]): T[];
    static concat(a: any[], b: any[]): any[];
    static insert<T>(list: T[], index: number, value: T): void;
    static removeAt<T>(list: T[], index: number): T;
    static removeAll<T>(list: T[], items: T[]): void;
    static remove<T>(list: T[], el: T): boolean;
    static clear(list: any[]): void;
    static isEmpty(list: any[]): boolean;
    static fill(list: any[], value: any, start?: number, end?: number): void;
    static equals(a: any[], b: any[]): boolean;
    static slice<T>(l: T[], from?: number, to?: number): T[];
    static splice<T>(l: T[], from: number, length: number): T[];
    static sort<T>(l: T[], compareFn?: (a: T, b: T) => number): void;
    static toString<T>(l: T[]): string;
    static toJSON<T>(l: T[]): string;
    static maximum<T>(list: T[], predicate: (t: T) => number): T;
    static find(arr: any, predicate: any, ctx?: any): any;
    static findIndex(arr: any, predicate: any, ctx?: any): number;
    private static isFlattenable(value);
    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
    private static arrayPush(array, values);
    /**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {number} depth The maximum recursion depth.
     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    private static baseFlatten(array, depth, predicate?, isStrict?, result?);
    /**
     * Flattens `array` a single level deep.
     *
     * @static
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, [3, [4]], 5]]);
     * // => [1, 2, [3, [4]], 5]
     */
    static flatten(array: any[]): any[];
    /**
     * Recursively flattens `array`.
     *
     * @static
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, [3, [4]], 5]]);
     * // => [1, 2, 3, 4, 5]
     */
    static flattenDeep(array: any[]): any[];
}
