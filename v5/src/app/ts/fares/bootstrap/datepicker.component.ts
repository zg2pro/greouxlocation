import {Component, Input, Output, Directive, EventEmitter} from '@angular/core';
import {NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-datepicker-config',
    templateUrl: 'templates/fares/datepicker.component.html',
    providers: [NgbDatepickerConfig]
})
export class FaresDatepicker {
    public model: NgbDateStruct;

    @Input()
    name: string;
    
    @Output()
    changed: EventEmitter<NgbDateStruct> = new EventEmitter<NgbDateStruct>();

    constructor(config: NgbDatepickerConfig) {
        // customize default values of datepicker used by this component tree
        config.firstDayOfWeek = 1;
    }

    valueChanged(event: any) {
        this.changed.emit(this.model);
    }
}
