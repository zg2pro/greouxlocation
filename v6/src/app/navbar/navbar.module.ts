import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './navbar.component';
import {TitleHome} from '../home/title/title.component';

@NgModule({
    imports: [NgbModule, RouterModule, CommonModule],
    declarations: [NavbarComponent, TitleHome],
    exports: [NavbarComponent]
})
export class NavbarModule {}