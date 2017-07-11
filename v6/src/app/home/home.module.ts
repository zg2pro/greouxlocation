import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GreouxCarousel} from './bootstrap/carousel.component';
import {TranslateModule} from "@ngx-translate/core";

import {MODULE_COMPONENTS, MODULE_ROUTES} from './home.routes';

@NgModule({
    imports: [NgbModule, CommonModule, RouterModule.forChild(MODULE_ROUTES), TranslateModule],
    declarations: [MODULE_COMPONENTS, GreouxCarousel]
})
export class HomeModule {

}