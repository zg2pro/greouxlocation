import { PipeMetadata } from '../pipes/metadata';
import { Type } from '../../facade/type';
/**
 * Resolve a `Type` for {@link PipeMetadata}.
 *
 */
export declare class PipeResolver {
    /**
     * Return {@link PipeMetadata} for a given `Type`.
     */
    resolve(type: Type): PipeMetadata;
}
