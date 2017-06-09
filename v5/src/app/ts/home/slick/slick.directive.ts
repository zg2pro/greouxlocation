import {Directive, ElementRef, Injector} from '@angular/core';
import {UpgradeComponent} from '@angular/upgrade/static';

@Directive({
    selector: 'slick'
})
export class SlickDirective extends UpgradeComponent {
    
        constructor(elementRef: ElementRef, injector: Injector) {
        super('slick', elementRef, injector);
    }
}