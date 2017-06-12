import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarModule} from './navbar/navbar.module';
import {HomeModule} from './home/home.module';
import {GreouxModule} from './greoux/greoux.module';
import {VisitModule} from './visit/visit.module';
import {FaresModule} from './fares/fares.module';
import {ContactModule} from './contact/contact.module';
import {AppComponent} from './app.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, JsonpModule,
        NavbarModule, HomeModule, GreouxModule, VisitModule, FaresModule, ContactModule,
        RouterModule.forRoot([]), NgbModule.forRoot()],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
