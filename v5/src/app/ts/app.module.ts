import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//import {Angular2ImageGalleryModule} from 'angular2-image-gallery';
import {NavbarModule} from './navbar/navbar.module';
import {FootModule} from './foot/foot.module';
import {HomeModule} from './home/home.module';
import {GreouxModule} from './greoux/greoux.module';
import {VisitModule} from './visit/visit.module';
import {FaresModule} from './fares/fares.module';
import {EquipmentModule} from './equipment/equipment.module';
import {AppComponent} from './app.component';

import 'web-animations-js';
import 'hammerjs';

//import 'core-js/es6/symbol';
//import 'core-js/es6/object';
//import 'core-js/es6/function';
//import 'core-js/es6/parse-int';
//import 'core-js/es6/parse-float';
//import 'core-js/es6/number';
//import 'core-js/es6/math';
//import 'core-js/es6/string';
//import 'core-js/es6/date';
//import 'core-js/es6/array';
//import 'core-js/es6/regexp';
//import 'core-js/es6/map';
//import 'core-js/es6/set';


@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, JsonpModule, //Angular2ImageGalleryModule, 
        NavbarModule, FootModule, HomeModule, GreouxModule, VisitModule, FaresModule, EquipmentModule,
        RouterModule.forRoot([]), NgbModule.forRoot()],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
