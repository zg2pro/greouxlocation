import { GetterFn, SetterFn, MethodFn } from './types';
import { PlatformReflectionCapabilities } from './platform_reflection_capabilities';
import { Type } from '../../facade/type';
export declare class ReflectionCapabilities implements PlatformReflectionCapabilities {
    private _reflect;
    constructor(reflect?: any);
    isReflectionEnabled(): boolean;
    factory(t: Type): Function;
    parameters(typeOrFunc: Type): any[][];
    rawParameters(typeOrFunc: Type): any[][];
    registerParameters(parameters: any, type: Type): void;
    annotations(typeOrFunc: Type): any[];
    ownAnnotations(typeOrFunc: Type): any[];
    registerAnnotations(annotations: any, typeOrFunc: Type): void;
    propMetadata(typeOrFunc: any): {
        [key: string]: any[];
    };
    ownPropMetadata(typeOrFunc: Type): {
        [key: string]: any[];
    };
    registerPropMetadata(propMetadata: any, typeOrFunc: Type | Function): void;
    registerDowngradedNg2ComponentName(componentName: string, typeOrFunc: Type | Function): void;
    downgradedNg2ComponentName(typeOrFunc: Type | Function): string;
    interfaces(type: Type): any[];
    getter(name: string): GetterFn;
    setter(name: string): SetterFn;
    method(name: string): MethodFn;
}
