import { Type } from '../../facade/type';
import { ReflectorReader } from './reflector_reader';
import { PlatformReflectionCapabilities } from './platform_reflection_capabilities';
/**
 * Reflective information about a symbol, including annotations, interfaces, and other metadata.
 */
export declare class ReflectionInfo {
    annotations: any[];
    parameters: any[][];
    factory: Function;
    interfaces: any[];
    propMetadata: {
        [key: string]: any[];
    };
    constructor(annotations?: any[], parameters?: any[][], factory?: Function, interfaces?: any[], propMetadata?: {
        [key: string]: any[];
    });
}
/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
export declare class Reflector extends ReflectorReader {
    constructor(reflectionCapabilities: PlatformReflectionCapabilities);
    isReflectionEnabled(): boolean;
    parameters(typeOrFunc: any): any[][];
    rawParameters(typeOrFunc: Type): any[][];
    registerParameters(parameters: any, typeOrFunc: Type): void;
    annotations(typeOrFunc: any): any[];
    ownAnnotations(typeOrFunc: Type): any[];
    registerAnnotations(parameters: any, typeOrFunc: Type): void;
    propMetadata(typeOrFunc: any): {
        [key: string]: any[];
    };
    ownPropMetadata(typeOrFunc: Type): {
        [key: string]: any[];
    };
    registerPropMetadata(parameters: any, typeOrFunc: Type | Function): void;
    registerDowngradedNg2ComponentName(componentName: string, typeOrFunc: Type | Function): void;
    downgradedNg2ComponentName(typeOrFunc: Type | Function): string;
}
