import { ChangeDetectionStrategy } from './constants';
export declare class UninitializedValue {
}
/**
 * Represents a basic change from a previous to a new value.
 */
export declare class SimpleChange {
    previousValue: any;
    currentValue: any;
    constructor(previousValue: any, currentValue: any);
    /**
     * Check whether the new value is the first value assigned.
     */
    isFirstChange(): boolean;
}
export declare class ChangeDetectionUtil {
    static uninitialized: UninitializedValue;
    static simpleChange(previousValue: any, currentValue: any): SimpleChange;
    static isOnPushChangeDetectionStrategy(changeDetectionStrategy: ChangeDetectionStrategy): boolean;
}
export { SimpleChanges } from '../linker/directive_lifecycle_interfaces';
