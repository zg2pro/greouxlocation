import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FaresDatepicker} from './bootstrap/datepicker.component';
import {NgbDatepickerModule, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import {MODULE_COMPONENTS, MODULE_ROUTES} from './fares.routes';

@NgModule({
    imports: [NgbModule, CommonModule, NgbDatepickerModule, RouterModule.forChild(MODULE_ROUTES)],
    declarations: [MODULE_COMPONENTS, FaresDatepicker],
})
export class FaresModule {}