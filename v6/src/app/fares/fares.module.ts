import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FaresDatepicker} from './bootstrap/datepicker.component';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from "@ngx-translate/core";

import {MODULE_COMPONENTS, MODULE_ROUTES} from './fares.routes';

@NgModule({
    imports: [NgbModule, CommonModule, FormsModule, ReactiveFormsModule, NgbDatepickerModule, RouterModule.forChild(MODULE_ROUTES), TranslateModule],
    declarations: [MODULE_COMPONENTS, FaresDatepicker]
})
export class FaresModule {}