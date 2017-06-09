import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {UpgradeModule} from '@angular/upgrade/static';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarModule} from './navbar/navbar.module';
import {HomeModule} from './home/home.module';
import {GreouxModule} from './greoux/greoux.module';
import {AppComponent} from './app.component';

@NgModule({
    imports: [BrowserModule, UpgradeModule, NavbarModule, HomeModule, GreouxModule, RouterModule.forRoot([]), NgbModule.forRoot()],
    declarations: [AppComponent],
    entryComponents : [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
    ngDoBootstrap(){}
}
