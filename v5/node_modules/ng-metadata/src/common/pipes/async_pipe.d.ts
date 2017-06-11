/// <reference types="angular" />
import { Observable } from 'rxjs/Observable';
import { PipeTransform } from '../../core/pipes/pipe_interfaces';
/**
 * Based on @cvuorinen angular1-async-filter implementation
 * @link https://github.com/cvuorinen/angular1-async-filter
 *
 * The `async` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has emitted.
 * When a new value is emitted, the `async` pipe marks the component to be checked for changes. ( runs $scope.$digest() )
 * When the component gets destroyed, the `async` pipe unsubscribes automatically to avoid potential memory leaks.
 *
 * ## Usage
 *
 *  object | async // for non observable
 *  object | async:this // for observable
 *
 * where:
 *  - `object` is one of type `Observable`, `Promise`, 'ng.IPromise' or 'ng.IHttpPromise'
 *  - `this` is pipe parameter ( in angular 1 reference to local $Scope ( we need for Observable disposal )
 *
 *  If you are using async with observables nad you don't provide scope we will throw Error to let you know that you forgot `this`, #perfmatters baby!
 *
 * ## Examples
 *
 * This example binds a `Promise` to the view. Clicking the `Resolve` button resolves the promise.
 *
 * {@example core/pipes/ts/async_pipe/async_pipe_example.ts region='AsyncPipePromise'}
 *
 * It's also possible to use `async` with Observables. The example below binds the `time` Observable
 * to the view. Every 500ms, the `time` Observable updates the view with the current time.
 *
 * {@example core/pipes/ts/async_pipe/async_pipe_example.ts region='AsyncPipeObservable'}
 */
export declare class AsyncPipe implements PipeTransform {
    private static nextObjectID;
    private static values;
    private static subscriptions;
    private static TRACK_PROP_NAME;
    private static _objectId(obj);
    private static _getSubscriptionStrategy(input);
    private static _markForCheck(scope);
    private static _dispose(inputId);
    transform(input: Observable<any> | ng.IPromise<any> | ng.IHttpPromise<any>, scope?: ng.IScope): any;
}
