"use strict";
var provider_1 = require("../../core/di/provider");
/**
 * Downgrades an Angular 2 Injectable so that it can be registered as an Angular 1
 * factory. Either a string or an ng-metadata OpaqueToken can be used for the name.
 *
 * **NOTE:** downgraded service must also be registered within Angular 2 `@Component` or `@NgModule`
 *
 * @example
 * ```typescript
 * // app.module.ts
 * import * as angular from 'angular'
 * import { downgradeInjectable } from '@angular/upgrade/static/';
 * import { downgradeNg2Injectable } from 'ng-metadata/upgrade';
 * import { provide } from 'ng-metadata/core';
 *
 * import { Ng2Service } from './services/ng2.service';
 * import { Ng2ServiceDecorated } from './services/ng2decorated.service';
 *
 * export const OtherServiceToken = new OpaqueToken('otherService')
 *
 * export const AppModule = angular
 *  .module('myApp',[])
 *  .factory(...downgradeNg2Injectable({token:'ng2Service', injectable: Ng2Service, downgradeFn: downgradeInjectable }))
 *  .factory(...downgradeNg2Injectable({token: OtherServiceToken, injectable: Ng2Service, downgradeFn: downgradeInjectable }))
 *  .factory(...downgradeNg2Injectable({injectable:Ng2ServiceDecorated, downgradeFn: downgradeInjectable}))
 * ```
 */
function downgradeNg2Injectable(_a) {
    var injectable = _a.injectable, downgradeFn = _a.downgradeFn, token = _a.token;
    var _b = _downgradeInjectable({
        token: token || injectable,
        injectable: injectable,
        downgradeFn: downgradeFn
    }), name = _b.name, factoryFn = _b.factoryFn;
    return [name, factoryFn];
}
exports.downgradeNg2Injectable = downgradeNg2Injectable;
/**
 *
 * Used to register an Angular 2 Service by including it in the `providers` array of an ng-metadata `@NgModule`,
 * where the service name and downgraded factory functions are automatically generated.
 *
 * **NOTE:** downgraded service must also be registered within Angular 2 Component or NgModule
 *
 * Returns a `ProviderLiteral` which can be used to register an Angular 2 Provider/Injectable
 * by including it in the providers array of an ng-metadata annotated Angular 1
 * `@Component` or `@NgModule`. Either a string or an ng-metadata OpaqueToken can be used for the name.
 *
 * @example
 * ```
 * // foo.component.ts - Angular 1(ngMetadata)
 * import { downgradeInjectable } from '@angular/upgrade/static/';
 * import { provideNg2Injectable } from 'ng-metadata/upgrade';
 * import { Component } from 'ng-metadata/core';
 *
 * import { Ng2Service } from './services/ng2.service';
 * import { Ng2ServiceDecorated } from './services/ng2decorated.service';
 *
 * const OtherServiceToken = new OpaqueToken('otherService')
 *
 * @Component({
   *  selector: 'my-foo',
   *  providers: [
   *    provideNg2Injectable({token:'ng2Service', injectable: Ng2Service, downgradeFn: downgradeInjectable }),
   *    provideNg2Injectable({token:OtherServiceToken, injectable: Ng2Service, downgradeFn: downgradeInjectable }),
   *    provideNg2Injectable({injectable:Ng2ServiceDecorated, downgradeFn: downgradeInjectable}),
   *  ],
   * })
 * class FooComponent{}
 * ```
 *
 * or via ngMetadata NgModule:
 *
 * @example
 * ```typescript
 * * @example
 * ```
 * // app.module.ts - Angular 1(ngMetadata)
 * import { downgradeInjectable } from '@angular/upgrade/static/';
 * import { provideNg2Injectable } from 'ng-metadata/upgrade';
 * import { NgModule } from 'ng-metadata/core';
 *
 * import { Ng2Service } from './services/ng2.service';
 * import { Ng2ServiceDecorated } from './services/ng2decorated.service';
 *
 * const OtherServiceToken = new OpaqueToken('otherService')
 *
 * @NgModule({
   *  providers: [
   *    provideNg2Injectable({token:'ng2Service', injectable: Ng2Service, downgradeFn: downgradeInjectable }),
   *    provideNg2Injectable({token:OtherServiceToken, injectable: Ng2Service, downgradeFn: downgradeInjectable }),
   *    provideNg2Injectable({injectable:Ng2ServiceDecorated, downgradeFn: downgradeInjectable}),
   *  ],
   * })
 * export class AppModule{}
 * ```
 *
 * as you've may noticed in one registration we've omitted `token`, how is that possible that it works you ask?
 * this is thanks to ngMetadata `@Injectable()` decorator, we can decorate Angular 2 Classes with our ngMetadata `@Injectable`,
 * which gives us benefit to omit Opaque tokens creation and use the same class for DI for both Angular 2 and Angular 1.
 * POWER OVERWHELMING RIGHT?!
 *
 * Enough Talk! Show me how the service looks like:
 * ```typescript
 * // ./services/ng2decorated.service.ts
 *
 * import {Injectable} from '@angular/core';
 * import {Injectable as KeepNg1Injectable} from 'ng-metadata/core';
 *
 * @KeepNg1Injectable()
 * @Injectable()
 * export class Ng2ServiceDecorated {
 *  constructor(){}
 *  greet(){}
 * }
 * ```
 */
function provideNg2Injectable(_a) {
    var injectable = _a.injectable, downgradeFn = _a.downgradeFn, token = _a.token;
    var _b = _downgradeInjectable({
        token: token || injectable,
        injectable: injectable,
        downgradeFn: downgradeFn
    }), name = _b.name, factoryFn = _b.factoryFn, deps = _b.deps;
    return {
        provide: name,
        useFactory: factoryFn,
        deps: deps,
    };
}
exports.provideNg2Injectable = provideNg2Injectable;
/**
 *
 * @private
 * @internal
 */
function _downgradeInjectable(_a) {
    var token = _a.token, injectable = _a.injectable, downgradeFn = _a.downgradeFn;
    var downgradedInjectableFactory = downgradeFn(injectable);
    var _b = downgradedInjectableFactory.$inject, $inject = _b === void 0 ? [] : _b;
    var name = provider_1.getInjectableName(token);
    return {
        name: name,
        factoryFn: downgradedInjectableFactory,
        deps: $inject
    };
}
exports._downgradeInjectable = _downgradeInjectable;
//# sourceMappingURL=downgrade_injectable.js.map