import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './navbar.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
    imports: [NgbModule, RouterModule, CommonModule, TranslateModule],
    declarations: [NavbarComponent],
    exports: [NavbarComponent]
})
export class NavbarModule {}