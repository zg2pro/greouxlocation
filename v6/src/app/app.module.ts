import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {JsonpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarModule} from './navbar/navbar.module';
import {AppComponent} from './app.component';


@NgModule({
    imports: [BrowserModule, FormsModule, JsonpModule,  
        NavbarModule, RouterModule.forRoot([]), NgbModule.forRoot()],
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
