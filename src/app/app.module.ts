import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {JsonpModule, HttpModule, Http} from "@angular/http";
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Configuration} from './app.rest.configuration';
import {AppAnalytics} from './app.analytics';
import {NavbarModule} from './navbar/navbar.module';
import {FootModule} from './foot/foot.module';
import {HomeModule} from './home/home.module';
import {GreouxModule} from './greoux/greoux.module';
import {VisitModule} from './visit/visit.module';
import {FaresModule} from './fares/fares.module';
import {EquipmentModule} from './equipment/equipment.module';
import {AppComponent} from './app.component';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, "assets/locale/", ".json");
}

@NgModule({
    imports: [BrowserModule, HttpModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [Http]
          }
        }), FormsModule, JsonpModule,  
        NavbarModule, FootModule, HomeModule, 
        GreouxModule, VisitModule, FaresModule, EquipmentModule,
        RouterModule.forRoot([]), NgbModule.forRoot()],
    declarations: [AppComponent],
    providers: [Configuration, AppAnalytics],
    bootstrap: [AppComponent]
})
export class AppModule {
}
