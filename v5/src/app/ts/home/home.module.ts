import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbdCarouselConfig} from './bootstrap/carousel.component';

import {MODULE_COMPONENTS, MODULE_ROUTES} from './home.routes';

@NgModule({
    imports: [NgbModule, CommonModule, RouterModule.forChild(MODULE_ROUTES)],
    declarations: [MODULE_COMPONENTS, NgbdCarouselConfig]
})
export class HomeModule {

}