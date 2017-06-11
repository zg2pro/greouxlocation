/// <reference types="angular" />
import { OpaqueToken } from '../core/di';
import { ProviderLiteral } from '../core/di/provider_util';
import { Type } from '../facade/type';
/**
 * `UpgradeAdapterRef` controls a hybrid AngularJS v1 / Angular v2 application,
 * but we don't have a use for it right now so no point in creating an interface for it...
 */
export declare type UpgradeAdapterRef = void;
export interface UpgradeAdapterInstance {
    /**
     * Allows Angular v2 Component to be used from AngularJS v1.
     */
    downgradeNg2Component(type: Type): Function;
    /**
     * Bootstrap a hybrid AngularJS v1 / Angular v2 application.
     */
    bootstrap(element: Element, modules?: any[], config?: ng.IAngularBootstrapConfig): UpgradeAdapterRef;
    /**
     * Allows Angular v2 service to be accessible from AngularJS v1.
     */
    downgradeNg2Provider(token: any): Function;
    /**
     * Allows AngularJS v1 service to be accessible from Angular v2.
     */
    upgradeNg1Provider(name: string, options?: {
        asToken: any;
    }): void;
}
export interface UpgradeAdapter {
    new (ng2AppModule: Type): UpgradeAdapterInstance;
}
export declare class NgMetadataUpgradeAdapter {
    _upgradeAdapter: UpgradeAdapterInstance;
    bootstrap: Function;
    /**
     * Store a reference to the instantiated upgradeAdapter
     */
    constructor(_upgradeAdapter: UpgradeAdapterInstance);
    /**
     * Used to register an Angular 2 component as a directive on an Angular 1 module,
     * where the directive name is automatically created from the selector.
     *
     * E.g. `.directive(...upgradeAdapter.downgradeNg2Component(Ng2Component))
     */
    downgradeNg2Component(component: Type): [string, Function];
    /**
     * Used to register an Angular 2 component by including it in the directives array
     * of an ng-metadata annotated Angular 1 component.
     *
     * E.g.
     * ```
     * @Component({
     *  selector: 'foo',
     *  directives: [upgradeAdapter.provideNg2Component(Ng2Component)],
     * })
     * ```
     */
    provideNg2Component(component: Type): Function;
    /**
     * Downgrades an Angular 2 Provider so that it can be registered as an Angular 1
     * factory. Either a string or an ng-metadata OpaqueToken can be used for the name.
     *
     * E.g.
     * ```
     * const otherServiceToken = new OpaqueToken('otherService')
     *
     * .factory(...upgradeAdapter.downgradeNg2Provider('ng2Service', { useClass: Ng2Service }))
     * .factory(...upgradeAdapter.downgradeNg2Provider(otherServiceToken, { useClass: Ng2Service }))
     * ```
     */
    downgradeNg2Provider(name: string | OpaqueToken, options: {
        useClass: Type;
    }): [string, Function];
    /**
     * Returns a ProviderLiteral which can be used to register an Angular 2 Provider
     * by including it in the providers array of an ng-metadata annotated Angular 1
     * component. Either a string or an ng-metadata OpaqueToken can be used for the name.
     *
     * E.g.
     * ```
     * const otherServiceToken = new OpaqueToken('otherService')
     *
     * @Component({
     *  selector: 'foo',
     *  providers: [
     *    upgradeAdapter.provideNg2Provider('ng2Service', { useClass: Ng2Service })
     *    upgradeAdapter.provideNg2Provider(otherServiceToken, { useClass: Ng2Service })
     *  ],
     * })
     * ```
     */
    provideNg2Provider(name: string | OpaqueToken, options: {
        useClass: Type;
    }): ProviderLiteral;
    /**
     * Used to make an Angular 1 Provider available to Angular 2 Components and Providers.
     * When using the upgraded Provider for DI, either the string name can be used with @Inject, or
     * a given token can be injected by type.
     *
     * @example
     * ```typescript
     * import {Injectable, NgModule} from 'ng-metadata/core';
     * import * as angular from 'angular';
     *
     * class MyCoolService {}
     *
     * angular.module('myApp',[])
     *  .service('myCoolSvc',MyCoolService)
     *
     * @Injectable()
     * class MyService{}
     *
     * @NgModule({
     *  providers: [MyService]
     * })
     * class AppModule{}
     *
     * // upgrade.module.ts
     * upgradeAdapter.upgradeNg1Provider(MyService)
     * upgradeAdapter.upgradeNg1Provider('myCoolSvc', { asToken: MyCoolService })
     * // angular 1 core services
     * upgradeAdapter.upgradeNg1Provider('$routeParams')
     *
     * // angular 2 Component
     * import { Component } from '@angular/core';
     *
     * @Component({
     *  selector: 'ng2',
     *  template: `<h1>Ng2</h1>`,
     * })
     * class Ng2Component {
     *  constructor(
     *    @Inject('$routeParams') private $routeParams: any, // by name using @Inject
     *    private myCoolSvc: MyCoolService // by type using the user defined token
     *    private mySvc: MyService // by type using ngMetadata @Injectable service class
     *  ) {}
     * }
     *```
     */
    upgradeNg1Provider(name: string | OpaqueToken | Type, options?: {
        asToken: string | OpaqueToken | Type | Function;
    }): void;
}
