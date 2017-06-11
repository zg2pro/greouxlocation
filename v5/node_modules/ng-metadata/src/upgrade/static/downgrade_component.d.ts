import { Type } from '../../facade/type';
export declare type ProvideNg2ComponentParams = {
    component: Type;
    downgradeFn: downgradeComponent;
};
export declare type downgradeComponent = (info: {
    component: Type;
    inputs?: string[];
    outputs?: string[];
}) => any;
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
export declare function downgradeNg2Component({component, downgradeFn}: ProvideNg2ComponentParams): [string, Function];
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
export declare function provideNg2Component({component, downgradeFn}: ProvideNg2ComponentParams): Function;
