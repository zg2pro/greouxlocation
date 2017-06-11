"use strict";
var reflection_1 = require("../../core/reflection/reflection");
var lang_1 = require("../../facade/lang");
var collections_1 = require("../../facade/collections");
/**
 * Used to register an Angular 2 Component as a directive on an Angular 1 module,
 * where the directive name and bindings(inputs,outputs) are automatically created from the selector.
 *
 * @example
 * ```typescript
 * // app.module.ts
 * import * as angular from 'angular'
 * import { downgradeComponent } from '@angular/upgrade/static/';
 * import { downgradeNg2Component } from 'ng-metadata/upgrade';
 * import { provide } from 'ng-metadata/core';
 *
 * import { Ng2Component } from './components/ng2.component';
 *
 * export const AppModule = angular
 *  .module('myApp',[])
 *  .directive(...downgradeNg2Component({component:Ng2Component,downgradeFn:downgradeComponent}))
 * ```
 */
function downgradeNg2Component(_a) {
    var component = _a.component, downgradeFn = _a.downgradeFn;
    var _b = _downgradeComponent({ component: component, downgradeFn: downgradeFn }), name = _b.name, factoryFn = _b.factoryFn;
    return [name, factoryFn];
}
exports.downgradeNg2Component = downgradeNg2Component;
/**
 * Used to register an Angular 2 Component by including it in the `declarations` array of an ng-metadata `@NgModule`,
 * where the directive name and bindings(inputs,outputs) are automatically created from the selector.
 *
 * @example
 * ```typescript
 * // app.module.ts
 * import { downgradeComponent } from '@angular/upgrade/static/';
 * import { provideNg2Component } from 'ng-metadata/upgrade';
 * import { NgModule } from 'ng-metadata/core';
 *
 * import { Ng2Component } from './components/ng2.component';
 *
 * @NgModule({
 *  declarations:[
 *    provideNg2Component({component:Ng2Component,downgradeFn:downgradeComponent})
 *  ]
 * })
 * export class AppModule {};
 * ```
 */
function provideNg2Component(_a) {
    var component = _a.component, downgradeFn = _a.downgradeFn;
    var _b = _downgradeComponent({ component: component, downgradeFn: downgradeFn }), name = _b.name, factoryFn = _b.factoryFn;
    reflection_1.reflector.registerDowngradedNg2ComponentName(name, factoryFn);
    return factoryFn;
}
exports.provideNg2Component = provideNg2Component;
/**
 *
 * @private
 * @internal
 */
function _downgradeComponent(_a) {
    var component = _a.component, downgradeFn = _a.downgradeFn;
    // process inputs,outputs
    var propAnnotations = reflection_1.reflector.propMetadata(component);
    var _b = _getOnlyInputOutputMetadata(propAnnotations) || {}, _c = _b.inputs, inputs = _c === void 0 ? [] : _c, _d = _b.outputs, outputs = _d === void 0 ? [] : _d;
    // process @Component
    var annotations = reflection_1.reflector.annotations(component);
    var cmpAnnotation = annotations[0];
    var directiveName = lang_1.resolveDirectiveNameFromSelector(cmpAnnotation.selector);
    var downgradedDirectiveFactory = downgradeFn(collections_1.StringMapWrapper.assign({}, inputs.length ? { inputs: inputs } : {}, outputs.length ? { outputs: outputs } : {}, { component: component }));
    return {
        name: directiveName,
        factoryFn: downgradedDirectiveFactory
    };
}
exports._downgradeComponent = _downgradeComponent;
function _getOnlyInputOutputMetadata(metadata) {
    if (collections_1.StringMapWrapper.isEmpty(metadata)) {
        return;
    }
    var inputOutput = {
        inputs: [],
        outputs: []
    };
    collections_1.StringMapWrapper.forEach(metadata, function (metaItem, key) {
        if (_isNg2InputPropDecoratorFactory(metaItem)) {
            inputOutput.inputs.push(_createBindingFromNg2PropDecoratorFactory(key, metaItem[0].bindingPropertyName));
            return;
        }
        if (_isNg2OutputPropDecoratorFactory(metaItem)) {
            inputOutput.outputs.push(_createBindingFromNg2PropDecoratorFactory(key, metaItem[0].bindingPropertyName));
            return;
        }
    });
    return inputOutput;
}
function _createBindingFromNg2PropDecoratorFactory(prop, attr) {
    return lang_1.isString(attr) ? prop + ": " + attr : "" + prop;
}
function _isNg2InputPropDecoratorFactory(metadataValues) {
    return _isNg2InputOutputPropDecoratorFactory(metadataValues, '@Input');
}
function _isNg2OutputPropDecoratorFactory(metadataValues) {
    return _isNg2InputOutputPropDecoratorFactory(metadataValues, '@Output');
}
function _isNg2InputOutputPropDecoratorFactory(metadataValues, type) {
    return metadataValues.some(function (metaValue) {
        var decoratorType = metaValue.toString();
        return decoratorType === type;
    });
}
//# sourceMappingURL=downgrade_component.js.map