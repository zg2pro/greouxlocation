import {Component} from '@angular/core';


@Component({
    //moduleId: module.id,
    selector: 'foot',
    templateUrl: 'templates/foot.component.html',
    styleUrls: ['foot.component.css']
})
export class FootComponent {

    //    constructor(private elementRef: ElementRef, private renderer: Renderer) {}
    //
    //    @Input('overflow')
    //    overflow: boolean = false;

    //    ngAfterViewInit() {
    //        this.tryMethod();
    //    }

    //https://swizec.com/blog/how-to-properly-wait-for-dom-elements-to-show-up-in-modern-browsers/swizec/6663
    //    tryMethod() {
    //        if ($("router-outlet").length < 2) {
    //            window.requestAnimationFrame(this.tryMethod);
    //        } else if ($("my-app")[0].offsetHeight > $("my-app")[0].scrollHeight) {
    //            // does not have overflow, TODO: add position: absolute to footer
    //         //   $("footer").css("position", "absolute");
    //        }
    //    };

    //    ngOnInit() {
    //        if (this.overflow) {
    //            // does not have overflow, TODO: add position: absolute to footer
    //            this.renderer.setElementStyle(this.elementRef.nativeElement, 'position', 'absolute');
    //           // $("footer").css("position", "absolute");
    //        }
    //    }

}