import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Angular2ImageGalleryModule} from 'angular2-image-gallery';

//import 'npm:web-animations-js/web-animations.min.js';
//import 'npm:hammerjs/hammer.js';
//
//import 'npm:core-js/es6/symbol.js';
//import 'npm:core-js/es6/object.js';
//import 'npm:core-js/es6/function.js';
//import 'npm:core-js/es6/parse-int.js';
//import 'npm:core-js/es6/parse-float.js';
//import 'npm:core-js/es6/number.js';
//import 'npm:core-js/es6/math.js';
//import 'npm:core-js/es6/string.js';
//import 'npm:core-js/es6/date.js';
//import 'npm:core-js/es6/array.js';
//import 'npm:core-js/es6/regexp.js';
//import 'npm:core-js/es6/map.js';
//import 'npm:core-js/es6/set.js';


import {MODULE_COMPONENTS, MODULE_ROUTES} from './visit.routes';

@NgModule({
    imports: [NgbModule, CommonModule, Angular2ImageGalleryModule, RouterModule.forChild(MODULE_ROUTES)],
    declarations: [MODULE_COMPONENTS]
})
export class VisitModule {
    //https://github.com/BenjaminBrandmeier/angular2-image-gallery/blob/master/README.md
}