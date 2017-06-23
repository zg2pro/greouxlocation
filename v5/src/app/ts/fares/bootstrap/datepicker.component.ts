import {Component} from '@angular/core';
import {NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-datepicker-config',
    templateUrl: 'templates/fares/datepicker.component.html',
    providers: [NgbDatepickerConfig]
})
export class FaresDatepicker {

    model: NgbDateStruct;

    constructor(config: NgbDatepickerConfig) {
        // customize default values of datepicker used by this component tree
        config.firstDayOfWeek = 1;
    }
}
