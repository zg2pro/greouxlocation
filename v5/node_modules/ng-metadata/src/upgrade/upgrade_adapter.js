"use strict";
var reflection_1 = require("../core/reflection/reflection");
var browser_utils_1 = require("../platform/browser_utils");
var di_1 = require("../core/di");
var lang_1 = require("../facade/lang");
var NgMetadataUpgradeAdapter = (function () {
    /**
     * Store a reference to the instantiated upgradeAdapter
     */
    function NgMetadataUpgradeAdapter(_upgradeAdapter) {
        this._upgradeAdapter = _upgradeAdapter;
        /**
         * Used to bootstrap a hybrid Angular 1 and Angular 2 application,
         * it is called with a single ng-metadata NgModule
         *
         * E.g. `upgradeAdapter.bootstrap(NgModule)`
         */
        this.bootstrap = browser_utils_1.createBootstrapFn(this._upgradeAdapter.bootstrap.bind(this._upgradeAdapter));
    }
    /**
     * Used to register an Angular 2 component as a directive on an Angular 1 module,
     * where the directive name is automatically created from the selector.
     *
     * E.g. `.directive(...upgradeAdapter.downgradeNg2Component(Ng2Component))
     */
    NgMetadataUpgradeAdapter.prototype.downgradeNg2Component = function (component) {
        var annotations = reflection_1.reflector.annotations(component);
        var cmpAnnotation = annotations[0];
        var directiveName = lang_1.resolveDirectiveNameFromSelector(cmpAnnotation.selector);
        return [directiveName, this._upgradeAdapter.downgradeNg2Component(component)];
    };
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
    NgMetadataUpgradeAdapter.prototype.provideNg2Component = function (component) {
        var _a = this.downgradeNg2Component(component), directiveName = _a[0], directiveFactory = _a[1];
        reflection_1.reflector.registerDowngradedNg2ComponentName(directiveName, directiveFactory);
        return directiveFactory;
    };
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
    NgMetadataUpgradeAdapter.prototype.downgradeNg2Provider = function (name, options) {
        var downgradedProvider = this._upgradeAdapter.downgradeNg2Provider(options.useClass);
        return [di_1.getInjectableName(name), downgradedProvider];
    };
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
    NgMetadataUpgradeAdapter.prototype.provideNg2Provider = function (name, options) {
        var downgradedProvider = this._upgradeAdapter.downgradeNg2Provider(options.useClass);
        return {
            provide: di_1.getInjectableName(name),
            useFactory: downgradedProvider,
            deps: downgradedProvider.$inject,
        };
    };
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
    NgMetadataUpgradeAdapter.prototype.upgradeNg1Provider = function (name, options) {
        if (options === void 0) { options = { asToken: name }; }
        return this._upgradeAdapter.upgradeNg1Provider(di_1.getInjectableName(name), options);
    };
    return NgMetadataUpgradeAdapter;
}());
exports.NgMetadataUpgradeAdapter = NgMetadataUpgradeAdapter;
//# sourceMappingURL=upgrade_adapter.js.map