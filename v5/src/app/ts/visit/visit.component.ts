import {Component} from '@angular/core';
import {AbstractContentComponent} from './../abstract.content.component';
import {ImageInterface} from './visit.metadata';

@Component({
    selector: 'visit-component',
    templateUrl: 'templates/visit.component.html',
    styleUrls: ['resources/styles/visit.component.css']
})
export class VisitComponent extends AbstractContentComponent {
    myImages: ImageInterface[];

    constructor() {
        super();
        let listNames = ["IM000521", "IM000523", "im000043", "im000044", "im000057",
            "im000058", "im000060", "im000066", "im000069", "im000073", "im000076",
            "jm1", "jm2", "jm3", "jm4", "jm5"];
        this.myImages = [];
        for (let entry of listNames) {
            let ii = new ImageInterface(entry);
            this.myImages.push(ii);
        }
    }
}
