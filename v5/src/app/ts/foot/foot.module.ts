import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FootComponent} from './foot.component';

@NgModule({
    imports: [NgbModule, RouterModule, CommonModule],
    declarations: [FootComponent],
    exports: [FootComponent]
})
export class FootModule {}