import { Type } from '../../facade/type';
/**
 * An interface implemented by all Angular type decorators,
 * which allows them to be used as ES7 decorators
 *
 * ES7 syntax:
 *
 * ```
 * @Component({...})
 * class MyClass {...}
 * ```
 */
export interface TypeDecorator {
    /**
     * Invoke as ES7 decorator.
     */
    <T extends Type>(type: T): T;
    (target: Object, propertyKey?: string | symbol, parameterIndex?: number): void;
}
export declare function makeDecorator(AnnotationCls: any, chainFn?: (fn: Function) => void): (...args: any[]) => (cls: any) => any;
export declare function makeParamDecorator(annotationCls: any, overrideParamDecorator?: Function): any;
export declare function makePropDecorator(decoratorCls: any): any;
