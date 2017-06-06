import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//import { SlickModule } from 'angular-slick';
import {NavbarModule} from './navbar/navbar.module';
import {HomeModule} from './home/home.module';
import {GreouxModule} from './greoux/greoux.module';
import {AppComponent} from './app.component';

@NgModule({
    imports: [BrowserModule, NavbarModule, HomeModule, GreouxModule, RouterModule.forRoot([]), NgbModule.forRoot()],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
