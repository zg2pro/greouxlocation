import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Ng2ImageGalleryModule} from 'ng2-image-gallery';
import {TranslateModule} from "@ngx-translate/core";


import {MODULE_COMPONENTS, MODULE_ROUTES} from './visit.routes';

@NgModule({
    imports: [NgbModule, CommonModule, Ng2ImageGalleryModule, RouterModule.forChild(MODULE_ROUTES), TranslateModule],
    declarations: [MODULE_COMPONENTS]
})
export class VisitModule {
    
}