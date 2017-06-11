import { DirectiveMetadata, ComponentMetadata } from '../directives/metadata_directives';
import { Type } from '../../facade/type';
/**
 * Resolve a `Type` for {@link DirectiveMetadata}.
 */
export declare class DirectiveResolver {
    /**
     * Return {@link DirectiveMetadata} for a given `Type`.
     */
    resolve(type: Type): DirectiveMetadata;
    /**
     * transform parameter annotations to required directives map so we can use it
     * for DDO creation
     *
     * map consist of :
     *  - key == name of directive
     *  - value == Angular 1 require expression
     *  ```js
     *  {
     *    ngModel: 'ngModel',
     *    form: '^^form',
     *    foo: '^foo',
     *    moo: '?^foo',
     *  }
     *  ```
     *
     * @param {Type} type
     * @returns {StringMap}
     */
    getRequiredDirectivesMap(type: Type): StringMap;
    parseAssetUrl(cmpMetadata: ComponentMetadata): string;
    /**
     *
     * @param type
     * @returns {DirectiveMetadata}
     * @throws Error
     * @private
     */
    private _getDirectiveMeta(type);
    private _mergeWithPropertyMetadata(directiveMetadata, propertyMetadata);
    private _merge(dm, inputs, attrs, outputs, host, queries);
}
