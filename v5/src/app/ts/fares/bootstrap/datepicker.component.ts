import {Component, Input, Output, Directive, EventEmitter} from '@angular/core';
//import { Control, FORM_DIRECTIVES, FORM_PROVIDERS, FormBuilder, Validators, NgForm } from '@angular/common';
//import {FORM_DIRECTIVES} from '@angular/forms';
//import {Control} from '@angular/forms';
import {NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-datepicker-config',
    templateUrl: 'templates/fares/datepicker.component.html',
    providers: [NgbDatepickerConfig]
    //, directives: [FORM_DIRECTIVES]
})
export class FaresDatepicker {
    model: NgbDateStruct;

    @Input()
    name: string;
    //control: Control;
    
    @Output()
    onChanged: EventEmitter<NgbDateStruct> = new EventEmitter<NgbDateStruct>();

    constructor(config: NgbDatepickerConfig) {
        // customize default values of datepicker used by this component tree
        config.firstDayOfWeek = 1;
    }

//    valueChanged(change: HTMLInputElement) {
//        console.log(change);
//        //this.onChanged.emit(change.);
//    }
}
