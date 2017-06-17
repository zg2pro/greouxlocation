import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//import {Angular2ImageGalleryModule} from 'angular2-image-gallery';



import {MODULE_COMPONENTS, MODULE_ROUTES} from './visit.routes';

@NgModule({
    imports: [NgbModule, CommonModule, RouterModule.forChild(MODULE_ROUTES)],
    declarations: [MODULE_COMPONENTS]
})
export class VisitModule {
    //https://github.com/BenjaminBrandmeier/angular2-image-gallery/blob/master/README.md
}