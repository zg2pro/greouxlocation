import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
/**
 * Use by directives and components to emit custom Events.
 *
 * ### Examples
 *
 * In the following example, `ZippyComponent` alternatively emits `open` and `close` events when its
 * title gets clicked:
 *
 * ```
 * @Component({
 *   selector: 'zippy',
 *   template: `
 *   <div class="zippy">
 *     <div ng-click="$ctrl.toggle()">Toggle</div>
 *     <div ng-hide="!$ctrl.visible">
 *       <ng-transclude></ng-transclude>
 *     </div>
 *  </div>`
 * })
 * export class ZippyComponent {
 *   visible: boolean = true;
 *
 *   @Output() open = new EventEmitter<boolean>();
 *   @Output() close = new EventEmitter<boolean>();
 *
 *   toggle() {
 *     this.visible = !this.visible;
 *     if (this.visible) {
 *       this.open.emit( this.visible );
 *     } else {
 *       this.close.emit( this.visible );
 *     }
 *   }
 * }
 * ```
 *
 * Use Rx.Observable but provides an adapter to make it work as specified here:
 * https://github.com/jhusain/observable-spec
 *
 * Once a reference implementation of the spec is available, switch to it.
 */
export declare class EventEmitter<T> extends Subject<T> {
    private __isAsync;
    /**
     * Creates an instance of [EventEmitter], which depending on [isAsync],
     * delivers events synchronously or asynchronously.
     */
    constructor(isAsync?: boolean);
    emit(value: T): void;
    subscribe(generatorOrNext?: any, error?: any, complete?: any): Subscription;
}
/**
 * Use by parent component to mark a function as an handler of a custom Event
 *
 *  ### Examples
 *
 *  In the following esample, `AppComponent` (parent component) handle `open` and `close` events emitted by `Zippy` (child component)
 *
 * ```
 * @Component({
 *   selector: 'app',
 *   template: `<zippy open="$ctrl.onOpen($event)" close="$ctrl.onClose($event)"></zippy>`,
 *   directives: [ZippyComponent]
 * })
 * export class AppComponent {
 *
 *   onOpen(zippyVisible: boolean) {
 *     // Event handler declared as simple method accepting single typed param
 *     console.log(`zippy visibility is: ${zippyVisible}`);
 *   }
 *   public onClose: EventHandler<boolean> = ( zippyVisible ) => {
 *     // Event handler declared using explict EventHandler interface specifing the type of the param
 *     console.log(`zippy visibility is: ${zippyVisible}`); // HERE zippyVisibile is a boolean === $event passed from zippy child component
 *   }
 * }
 * ```
 */
export interface EventHandler<T> extends Function {
    ($event: T): void;
}
