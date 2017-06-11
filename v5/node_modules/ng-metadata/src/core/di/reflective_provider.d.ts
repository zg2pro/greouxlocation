/// <reference types="angular" />
import { Type } from '../../facade/type';
import { Provider } from './provider';
/**
 * process provider literals and return map for angular1Module consumption
 * @param provider
 * @returns {{method: string, name: string, value: any}}
 */
export declare function resolveReflectiveProvider(provider: Provider): {
    method: string;
    name: string;
    value: any;
};
/**
 * returns StringMap of values needed for angular1Module registration and duplicity checks
 * @param injectable
 * @returns {any}
 * @private
 */
export declare function _getAngular1ModuleMetadataByType(injectable: Type | Function): {
    providerName: string;
    providerMethod: string;
    moduleMethod: string;
};
/**
 * run through Component tree and register everything that is registered via Metadata
 * - works for nested arrays like angular 2 does ;)
 * @param angular1Module
 * @param providers
 * @returns {ng.IModule}
 * @private
 */
export declare function _normalizeProviders(angular1Module: ng.IModule, providers: RawProvider<any>): ng.IModule;
/**
 * check if `findRegisteredType` is registered within angular1Module, so we don't have duplicates
 * @param findRegisteredType
 * @param angular1Module
 * @param instanceType
 * @param methodName
 * @returns {boolean}
 * @private
 */
export declare function _isTypeRegistered(findRegisteredType: string, angular1Module: ng.IModule, instanceType: string, methodName: string): boolean;
/**
 * we need to register 3 types of attribute directives, if we are registering directive,
 * because we need to allow all 3 types of binding on the defined directive [name],(name),name
 * @private
 */
export declare function _registerTypeProvider(angular1Module: ng.IModule, provider: Type, {moduleMethod, name, value}: {
    moduleMethod: string;
    name: string;
    value: Function;
}): void;
