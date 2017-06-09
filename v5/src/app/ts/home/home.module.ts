import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import {SlickDirective} from './slick/slick.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { MODULE_COMPONENTS, MODULE_ROUTES } from './home.routes';

@NgModule({
  imports: [ NgbModule, CommonModule, RouterModule.forChild(MODULE_ROUTES) ],
  declarations: [ MODULE_COMPONENTS, SlickDirective ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {
    
}