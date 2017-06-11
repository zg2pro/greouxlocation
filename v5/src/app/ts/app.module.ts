import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarModule} from './navbar/navbar.module';
import {HomeModule} from './home/home.module';
import {GreouxModule} from './greoux/greoux.module';
import {AppComponent} from './app.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, JsonpModule,
        NavbarModule, HomeModule, GreouxModule, 
        RouterModule.forRoot([]), NgbModule.forRoot()],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
    //    ngDoBootstrap(appRef: ApplicationRef): void {
    //        appRef.bootstrap(AppComponent);
    //    }
    //    ngDoBootstrap() {
    //        console.log("appModule: ngDoBootstrap");
    //    }
}
