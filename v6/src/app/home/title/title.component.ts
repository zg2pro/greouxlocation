import {Component} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-carousel-config',
    templateUrl: './carousel.component.html',
    providers: [NgbCarouselConfig]
})
export class GreouxCarousel {
    constructor(config: NgbCarouselConfig) {
        // customize default values of carousels used by this component tree
        config.interval = 3000;
        config.wrap = true;
        config.keyboard = false;
    }
}
