"use strict";
var lang_1 = require("../../facade/lang");
var collections_1 = require("../../facade/collections");
var lang_2 = require("../../facade/lang");
var lang_3 = require("../../facade/lang");
/**
 * @TODO
 * this module is not used, we can leverage the Key creation for
 * caching @Inject token to string names for performance
 */
/**
 * A unique object used for retrieving items from the {@link Injector}.
 *
 * Keys have:
 * - a system-wide unique `id`.
 * - a `token`.
 *
 * `Key` is used internally by {@link Injector} because its system-wide unique `id` allows the
 * injector to store created objects in a more efficient way.
 *
 * `Key` should not be created directly. {@link Injector} creates keys automatically when resolving
 * providers.
 */
//export class Key {
//  /**
//   * Private
//   */
//  constructor( public token: Object, public id: number ) {
//    if ( isBlank( token ) ) {
//      throw new Error( 'Token must be defined!' );
//    }
//  }
//
//  /**
//   * Returns a stringified token.
//   */
//  get displayName(): string { return stringify( this.token ); }
//
//  /**
//   * Retrieves a `Key` for a token.
//   */
//  static get( token: Object ): Key { return _globalKeyRegistry.get( resolveForwardRef( token ) ); }
//
//  /**
//   * @returns the number of keys registered in the system.
//   */
//  static get numberOfKeys(): number { return _globalKeyRegistry.numberOfKeys; }
//}
/**
 * @internal
 */
var KeyRegistry = (function () {
    function KeyRegistry() {
        this._allKeys = collections_1.ListWrapper.create();
        this._idCounter = 0;
    }
    //get( token: string | OpaqueToken | Type ): string {
    //  // Return it if it is already a string like `'$http'` or `'$state'`
    //  if(isString(token)) {
    //    return token;
    //  }
    //  if(token instanceof OpaqueToken){
    //    return token.desc;
    //  }
    //
    //  const tokenString = stringify( token );
    //  const hasToken = StringMapWrapper.contains( this._allKeys, tokenString );
    //
    //  if ( hasToken ) {
    //    return tokenString;
    //  }
    //
    //  const newKey = `${ tokenString }${ this._uniqueId() }`;
    //  StringMapWrapper.set( this._allKeys, newKey, token );
    //  return newKey;
    //}
    /**
     *
     * @param token
     * @returns {*}
     */
    KeyRegistry.prototype.get = function (token) {
        if (!lang_2.isType(token)) {
            throw new Error("KeyRegistry#get:\n                        ================\n                        you'v tried to create a key for `" + token + "`\n                        creating and getting key tokens is avaialable only for Type");
        }
        var newKey = "" + lang_3.getTypeName(token) + KeyRegistry._suffix + this._uniqueId();
        this._allKeys.push(newKey);
        return newKey;
    };
    Object.defineProperty(KeyRegistry.prototype, "numberOfKeys", {
        get: function () { return collections_1.ListWrapper.size(this._allKeys); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyRegistry.prototype, "allKeys", {
        get: function () { return collections_1.ListWrapper.clone(this._allKeys); },
        enumerable: true,
        configurable: true
    });
    /**
     * just for testing purposes
     * @private
     * @internal
     */
    KeyRegistry.prototype._reset = function () {
        collections_1.ListWrapper.clear(this._allKeys);
        this._idCounter = 0;
    };
    /**
     * Generates a unique ID. If `prefix` is provided the ID is appended to it.
     *
     * @param {string} [prefix] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _uniqueId('contact_');
     * // => 'contact_104'
     *
     * _uniqueId();
     * // => '105'
     */
    KeyRegistry.prototype._uniqueId = function (prefix) {
        var id = ++this._idCounter;
        return "" + lang_1.baseToString(prefix) + id;
    };
    return KeyRegistry;
}());
KeyRegistry._suffix = "#";
exports.KeyRegistry = KeyRegistry;
exports.globalKeyRegistry = new KeyRegistry();
//# sourceMappingURL=key.js.map