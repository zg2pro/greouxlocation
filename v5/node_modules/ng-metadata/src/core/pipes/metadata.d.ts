import { InjectableMetadata } from '../di/metadata';
/**
 * Declare reusable pipe function.
 *
 * A "pure" pipe is only re-evaluated when either the input or any of the arguments change.
 *
 * When not specified, pipes default to being pure.
 *
 * ### Example
 *
 * {@example core/ts/metadata/metadata.ts region='pipe'}
 */
export declare class PipeMetadata extends InjectableMetadata {
    name: string;
    constructor({name, pure}: {
        name: string;
        pure?: boolean;
    });
    readonly pure: boolean;
}
