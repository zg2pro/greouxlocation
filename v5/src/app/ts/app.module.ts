import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Angular2ImageGalleryModule} from 'angular2-image-gallery';
import {NavbarModule} from './navbar/navbar.module';
import {FootModule} from './foot/foot.module';
import {HomeModule} from './home/home.module';
import {GreouxModule} from './greoux/greoux.module';
import {VisitModule} from './visit/visit.module';
import {FaresModule} from './fares/fares.module';
import {EquipmentModule} from './equipment/equipment.module';
import {AppComponent} from './app.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, JsonpModule, Angular2ImageGalleryModule, 
        NavbarModule, FootModule, HomeModule, GreouxModule, VisitModule, FaresModule, EquipmentModule,
        RouterModule.forRoot([]), NgbModule.forRoot()],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
